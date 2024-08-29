import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Mensaje, MensajeRelations, Paciente, Terapeuta} from '../models';
import {PacienteRepository} from './paciente.repository';
import {TerapeutaRepository} from './terapeuta.repository';

export class MensajeRepository extends DefaultCrudRepository<
  Mensaje,
  typeof Mensaje.prototype.id,
  MensajeRelations
> {

  public readonly pacienteMensaje: BelongsToAccessor<Paciente, typeof Mensaje.prototype.id>;

  public readonly terapeutaMensaje: BelongsToAccessor<Terapeuta, typeof Mensaje.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>,
  ) {
    super(Mensaje, dataSource);
    this.terapeutaMensaje = this.createBelongsToAccessorFor('terapeutaMensaje', terapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutaMensaje', this.terapeutaMensaje.inclusionResolver);
    this.pacienteMensaje = this.createBelongsToAccessorFor('pacienteMensaje', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacienteMensaje', this.pacienteMensaje.inclusionResolver);
  }
}
