import {Entity, hasMany, model, property} from '@loopback/repository';
import {Consulta} from './consulta.model';
import {EvaluacionProgreso} from './evaluacion-progreso.model';
import {Mensaje} from './mensaje.model';
import {ModuloPsicoeducativo} from './modulo-psicoeducativo.model';

@model()
export class Terapeuta extends Entity {
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
  CedulaLicenciatura: string;

  @property({
    type: 'string',
  })
  CedulaEspecialidad: string;

  @property({
    type: 'string',
  })
  Especialidad?: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

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
  FechaRegistro?: string;

  @hasMany(() => ModuloPsicoeducativo)
  modulosPsicoeducativos: ModuloPsicoeducativo[];

  @hasMany(() => Consulta)
  consultas: Consulta[];

  @hasMany(() => Mensaje)
  mensajes: Mensaje[];

  @hasMany(() => EvaluacionProgreso)
  evaluacionProgresos: EvaluacionProgreso[];

  constructor(data?: Partial<Terapeuta>) {
    super(data);
  }
}

export interface TerapeutaRelations {
  // describe navigational properties here
}

export type TerapeutaWithRelations = Terapeuta & TerapeutaRelations;
