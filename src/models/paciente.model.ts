import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {EvaluacionProgreso} from './evaluacion-progreso.model';
import {Mensaje} from './mensaje.model';
import {Consulta} from './consulta.model';
import {EjercicioPractico} from './ejercicio-practico.model';
import {HistoriaClinica} from './historia-clinica.model';
import {Terapeuta} from './terapeuta.model';
import {PacienteTerapeuta} from './paciente-terapeuta.model';

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
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaRegistro?: string;

  @hasMany(() => EvaluacionProgreso)
  evaluacionesDelProgreso: EvaluacionProgreso[];

  @hasMany(() => Mensaje)
  mensajes: Mensaje[];

  @hasMany(() => Consulta)
  consultas: Consulta[];

  @hasMany(() => EjercicioPractico)
  ejercicioPracticos: EjercicioPractico[];

  @hasOne(() => HistoriaClinica)
  historiaClinica: HistoriaClinica;

  @hasMany(() => Terapeuta, {through: {model: () => PacienteTerapeuta}})
  terapeutas: Terapeuta[];

  constructor(data?: Partial<Paciente>) {
    super(data);
  }
}

export interface PacienteRelations {
  // describe navigational properties here
}

export type PacienteWithRelations = Paciente & PacienteRelations;
