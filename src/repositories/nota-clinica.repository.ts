import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {NotaClinica, NotaClinicaRelations, Consulta} from '../models';
import {ConsultaRepository} from './consulta.repository';

export class NotaClinicaRepository extends DefaultCrudRepository<
  NotaClinica,
  typeof NotaClinica.prototype.id,
  NotaClinicaRelations
> {

  public readonly consultaNota: BelongsToAccessor<Consulta, typeof NotaClinica.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>,
  ) {
    super(NotaClinica, dataSource);
    this.consultaNota = this.createBelongsToAccessorFor('consultaNota', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultaNota', this.consultaNota.inclusionResolver);
  }
}
