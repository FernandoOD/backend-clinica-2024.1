import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EntradaHistoria, EntradaHistoriaRelations, Consulta, HistoriaClinica} from '../models';
import {ConsultaRepository} from './consulta.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';

export class EntradaHistoriaRepository extends DefaultCrudRepository<
  EntradaHistoria,
  typeof EntradaHistoria.prototype.id,
  EntradaHistoriaRelations
> {

  public readonly consulta: BelongsToAccessor<Consulta, typeof EntradaHistoria.prototype.id>;

  public readonly historiaClinica: BelongsToAccessor<HistoriaClinica, typeof EntradaHistoria.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>,
  ) {
    super(EntradaHistoria, dataSource);
    this.historiaClinica = this.createBelongsToAccessorFor('historiaClinica', historiaClinicaRepositoryGetter,);
    this.registerInclusionResolver('historiaClinica', this.historiaClinica.inclusionResolver);
    this.consulta = this.createBelongsToAccessorFor('consulta', consultaRepositoryGetter,);
    this.registerInclusionResolver('consulta', this.consulta.inclusionResolver);
  }
}
