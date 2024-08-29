import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Paciente, PacienteRelations, EvaluacionProgreso, Mensaje, Consulta} from '../models';
import {EvaluacionProgresoRepository} from './evaluacion-progreso.repository';
import {MensajeRepository} from './mensaje.repository';
import {ConsultaRepository} from './consulta.repository';

export class PacienteRepository extends DefaultCrudRepository<
  Paciente,
  typeof Paciente.prototype.id,
  PacienteRelations
> {

  public readonly evaluacionesDelProgreso: HasManyRepositoryFactory<EvaluacionProgreso, typeof Paciente.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensaje, typeof Paciente.prototype.id>;

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Paciente.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('EvaluacionProgresoRepository') protected evaluacionProgresoRepositoryGetter: Getter<EvaluacionProgresoRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>,
  ) {
    super(Paciente, dataSource);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.evaluacionesDelProgreso = this.createHasManyRepositoryFactoryFor('evaluacionesDelProgreso', evaluacionProgresoRepositoryGetter,);
    this.registerInclusionResolver('evaluacionesDelProgreso', this.evaluacionesDelProgreso.inclusionResolver);
  }
}
