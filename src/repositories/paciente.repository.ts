import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Paciente, PacienteRelations, EvaluacionProgreso, Mensaje, Consulta, EjercicioPractico, HistoriaClinica, Terapeuta, PacienteTerapeuta} from '../models';
import {EvaluacionProgresoRepository} from './evaluacion-progreso.repository';
import {MensajeRepository} from './mensaje.repository';
import {ConsultaRepository} from './consulta.repository';
import {EjercicioPracticoRepository} from './ejercicio-practico.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';
import {PacienteTerapeutaRepository} from './paciente-terapeuta.repository';
import {TerapeutaRepository} from './terapeuta.repository';

export class PacienteRepository extends DefaultCrudRepository<
  Paciente,
  typeof Paciente.prototype.id,
  PacienteRelations
> {

  public readonly evaluacionesDelProgreso: HasManyRepositoryFactory<EvaluacionProgreso, typeof Paciente.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensaje, typeof Paciente.prototype.id>;

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Paciente.prototype.id>;

  public readonly ejercicioPracticos: HasManyRepositoryFactory<EjercicioPractico, typeof Paciente.prototype.id>;

  public readonly historiaClinica: HasOneRepositoryFactory<HistoriaClinica, typeof Paciente.prototype.id>;

  public readonly terapeutas: HasManyThroughRepositoryFactory<Terapeuta, typeof Terapeuta.prototype.id,
          PacienteTerapeuta,
          typeof Paciente.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('EvaluacionProgresoRepository') protected evaluacionProgresoRepositoryGetter: Getter<EvaluacionProgresoRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('EjercicioPracticoRepository') protected ejercicioPracticoRepositoryGetter: Getter<EjercicioPracticoRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>, @repository.getter('PacienteTerapeutaRepository') protected pacienteTerapeutaRepositoryGetter: Getter<PacienteTerapeutaRepository>, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>,
  ) {
    super(Paciente, dataSource);
    this.terapeutas = this.createHasManyThroughRepositoryFactoryFor('terapeutas', terapeutaRepositoryGetter, pacienteTerapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutas', this.terapeutas.inclusionResolver);
    this.historiaClinica = this.createHasOneRepositoryFactoryFor('historiaClinica', historiaClinicaRepositoryGetter);
    this.registerInclusionResolver('historiaClinica', this.historiaClinica.inclusionResolver);
    this.ejercicioPracticos = this.createHasManyRepositoryFactoryFor('ejercicioPracticos', ejercicioPracticoRepositoryGetter,);
    this.registerInclusionResolver('ejercicioPracticos', this.ejercicioPracticos.inclusionResolver);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.evaluacionesDelProgreso = this.createHasManyRepositoryFactoryFor('evaluacionesDelProgreso', evaluacionProgresoRepositoryGetter,);
    this.registerInclusionResolver('evaluacionesDelProgreso', this.evaluacionesDelProgreso.inclusionResolver);
  }
}
