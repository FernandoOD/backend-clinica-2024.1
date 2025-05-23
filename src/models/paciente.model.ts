import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Consulta} from './consulta.model';
import {EjercicioPractico} from './ejercicio-practico.model';
import {EvaluacionProgreso} from './evaluacion-progreso.model';
import {HistoriaClinica} from './historia-clinica.model';
import {Mensaje} from './mensaje.model';
import {ModuloPsicoeducativo} from './modulo-psicoeducativo.model';
import {NotaClinica} from './nota-clinica.model';
import {PacienteEjercicioPractico} from './paciente-ejercicio-practico.model';
import {PacienteModuloPsicoeducativo} from './paciente-modulo-psicoeducativo.model';
import {PacienteTerapeuta} from './paciente-terapeuta.model';
import {Terapeuta} from './terapeuta.model';

@model()
export class Paciente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoPaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoMaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
  })
  Telefono?: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    jsonSchema: {
      format: 'date', // Restringe el formato a solo fecha 'YYYY-MM-DD'
    },
  })
  FechaNacimiento?: string;

  @property({
    type: 'string',
    jsonSchema: {
      format: 'date', // Restringe el formato a solo fecha 'YYYY-MM-DD'
    },
  })
  FechaRegistro?: string;

  @hasMany(() => EvaluacionProgreso)
  evaluacionesDelProgreso: EvaluacionProgreso[];

  @hasMany(() => Mensaje)
  mensajes: Mensaje[];

  @hasMany(() => Consulta)
  consultas: Consulta[];

  @hasMany(() => NotaClinica)
  notasClinicas: NotaClinica[];


  @hasOne(() => HistoriaClinica)
  historiaClinica: HistoriaClinica;

  @hasMany(() => Terapeuta, {through: {model: () => PacienteTerapeuta}})
  terapeutas: Terapeuta[];

  @hasMany(() => EjercicioPractico, {through: {model: () => PacienteEjercicioPractico}})
  ejercicioPracticos: EjercicioPractico[];

  @hasMany(() => ModuloPsicoeducativo, {through: {model: () => PacienteModuloPsicoeducativo}})
  pacienteModelosPsicoeducativos: ModuloPsicoeducativo[];

  constructor(data?: Partial<Paciente>) {
    super(data);
  }
}

export interface PacienteRelations {
  // describe navigational properties here
}

export type PacienteWithRelations = Paciente & PacienteRelations;
