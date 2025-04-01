import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {NotaClinica, NotaClinicaRelations, Paciente} from '../models';
import {PacienteRepository} from './paciente.repository';

export class NotaClinicaRepository extends DefaultCrudRepository<
  NotaClinica,
  typeof NotaClinica.prototype.id,
  NotaClinicaRelations
> {

  public readonly pacienteNota: BelongsToAccessor<Paciente, typeof NotaClinica.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>,
  ) {
    super(NotaClinica, dataSource);
    this.pacienteNota = this.createBelongsToAccessorFor('pacienteNota', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacienteNota', this.pacienteNota.inclusionResolver);
  }
}
