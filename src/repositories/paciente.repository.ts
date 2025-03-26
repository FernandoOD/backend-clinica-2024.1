import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Consulta, EvaluacionProgreso, HistoriaClinica, Mensaje, Paciente, PacienteRelations, PacienteTerapeuta, Terapeuta, EjercicioPractico, PacienteEjercicioPractico, ModuloPsicoeducativo, PacienteModuloPsicoeducativo} from '../models';
import {ConsultaRepository} from './consulta.repository';
import {EvaluacionProgresoRepository} from './evaluacion-progreso.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';
import {MensajeRepository} from './mensaje.repository';
import {PacienteTerapeutaRepository} from './paciente-terapeuta.repository';
import {TerapeutaRepository} from './terapeuta.repository';
import {PacienteEjercicioPracticoRepository} from './paciente-ejercicio-practico.repository';
import {EjercicioPracticoRepository} from './ejercicio-practico.repository';
import {PacienteModuloPsicoeducativoRepository} from './paciente-modulo-psicoeducativo.repository';
import {ModuloPsicoeducativoRepository} from './modulo-psicoeducativo.repository';

export class PacienteRepository extends DefaultCrudRepository<
  Paciente,
  typeof Paciente.prototype.id,
  PacienteRelations
> {

  public readonly evaluacionesDelProgreso: HasManyRepositoryFactory<EvaluacionProgreso, typeof Paciente.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensaje, typeof Paciente.prototype.id>;

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Paciente.prototype.id>;

  public readonly historiaClinica: HasOneRepositoryFactory<HistoriaClinica, typeof Paciente.prototype.id>;

  public readonly terapeutas: HasManyThroughRepositoryFactory<Terapeuta, typeof Terapeuta.prototype.id,
    PacienteTerapeuta,
    typeof Paciente.prototype.id
  >;

  public readonly ejercicioPracticos: HasManyThroughRepositoryFactory<EjercicioPractico, typeof EjercicioPractico.prototype.id,
          PacienteEjercicioPractico,
          typeof Paciente.prototype.id
        >;

  public readonly pacienteModelosPsicoeducativos: HasManyThroughRepositoryFactory<ModuloPsicoeducativo, typeof ModuloPsicoeducativo.prototype.id,
          PacienteModuloPsicoeducativo,
          typeof Paciente.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('EvaluacionProgresoRepository') protected evaluacionProgresoRepositoryGetter: Getter<EvaluacionProgresoRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>, @repository.getter('PacienteTerapeutaRepository') protected pacienteTerapeutaRepositoryGetter: Getter<PacienteTerapeutaRepository>, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>, @repository.getter('PacienteEjercicioPracticoRepository') protected pacienteEjercicioPracticoRepositoryGetter: Getter<PacienteEjercicioPracticoRepository>, @repository.getter('EjercicioPracticoRepository') protected ejercicioPracticoRepositoryGetter: Getter<EjercicioPracticoRepository>, @repository.getter('PacienteModuloPsicoeducativoRepository') protected pacienteModuloPsicoeducativoRepositoryGetter: Getter<PacienteModuloPsicoeducativoRepository>, @repository.getter('ModuloPsicoeducativoRepository') protected moduloPsicoeducativoRepositoryGetter: Getter<ModuloPsicoeducativoRepository>,
  ) {
    super(Paciente, dataSource);
    this.pacienteModelosPsicoeducativos = this.createHasManyThroughRepositoryFactoryFor('pacienteModelosPsicoeducativos', moduloPsicoeducativoRepositoryGetter, pacienteModuloPsicoeducativoRepositoryGetter,);
    this.registerInclusionResolver('pacienteModelosPsicoeducativos', this.pacienteModelosPsicoeducativos.inclusionResolver);
    this.ejercicioPracticos = this.createHasManyThroughRepositoryFactoryFor('ejercicioPracticos', ejercicioPracticoRepositoryGetter, pacienteEjercicioPracticoRepositoryGetter,);
    this.registerInclusionResolver('ejercicioPracticos', this.ejercicioPracticos.inclusionResolver);
    this.terapeutas = this.createHasManyThroughRepositoryFactoryFor('terapeutas', terapeutaRepositoryGetter, pacienteTerapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutas', this.terapeutas.inclusionResolver);
    this.historiaClinica = this.createHasOneRepositoryFactoryFor('historiaClinica', historiaClinicaRepositoryGetter);
    this.registerInclusionResolver('historiaClinica', this.historiaClinica.inclusionResolver);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.evaluacionesDelProgreso = this.createHasManyRepositoryFactoryFor('evaluacionesDelProgreso', evaluacionProgresoRepositoryGetter,);
    this.registerInclusionResolver('evaluacionesDelProgreso', this.evaluacionesDelProgreso.inclusionResolver);
  }
}
