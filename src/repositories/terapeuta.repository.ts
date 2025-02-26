import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Consulta, EvaluacionProgreso, Mensaje, Paciente, PacienteTerapeuta, Terapeuta, TerapeutaRelations} from '../models';
import {ConsultaRepository} from './consulta.repository';
import {EvaluacionProgresoRepository} from './evaluacion-progreso.repository';
import {MensajeRepository} from './mensaje.repository';
import {PacienteTerapeutaRepository} from './paciente-terapeuta.repository';
import {PacienteRepository} from './paciente.repository';

export class TerapeutaRepository extends DefaultCrudRepository<
  Terapeuta,
  typeof Terapeuta.prototype.id,
  TerapeutaRelations
> {


  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Terapeuta.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensaje, typeof Terapeuta.prototype.id>;

  public readonly evaluacionProgresos: HasManyRepositoryFactory<EvaluacionProgreso, typeof Terapeuta.prototype.id>;

  public readonly pacientes: HasManyThroughRepositoryFactory<Paciente, typeof Paciente.prototype.id,
    PacienteTerapeuta,
    typeof Terapeuta.prototype.id
  >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>, @repository.getter('EvaluacionProgresoRepository') protected evaluacionProgresoRepositoryGetter: Getter<EvaluacionProgresoRepository>, @repository.getter('PacienteTerapeutaRepository') protected pacienteTerapeutaRepositoryGetter: Getter<PacienteTerapeutaRepository>, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>,
  ) {
    super(Terapeuta, dataSource);
    this.pacientes = this.createHasManyThroughRepositoryFactoryFor('pacientes', pacienteRepositoryGetter, pacienteTerapeutaRepositoryGetter,);
    this.registerInclusionResolver('pacientes', this.pacientes.inclusionResolver);
    this.evaluacionProgresos = this.createHasManyRepositoryFactoryFor('evaluacionProgresos', evaluacionProgresoRepositoryGetter,);
    this.registerInclusionResolver('evaluacionProgresos', this.evaluacionProgresos.inclusionResolver);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
  }
}
