import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Paciente} from './paciente.model';
import {Terapeuta} from './terapeuta.model';

@model()
export class Mensaje extends Entity {
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
  Contenido: string;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaEnvio?: string;

  @belongsTo(() => Paciente, {name: 'pacienteMensaje'})
  pacienteId: number;

  @belongsTo(() => Terapeuta, {name: 'terapeutaMensaje'})
  terapeutaId: number;

  constructor(data?: Partial<Mensaje>) {
    super(data);
  }
}

export interface MensajeRelations {
  // describe navigational properties here
}

export type MensajeWithRelations = Mensaje & MensajeRelations;
