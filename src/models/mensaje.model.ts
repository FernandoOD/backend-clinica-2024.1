import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Mensaje>) {
    super(data);
  }
}

export interface MensajeRelations {
  // describe navigational properties here
}

export type MensajeWithRelations = Mensaje & MensajeRelations;
