import {Entity, model, property} from '@loopback/repository';

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
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaRegistro?: string;

  constructor(data?: Partial<Terapeuta>) {
    super(data);
  }
}

export interface TerapeutaRelations {
  // describe navigational properties here
}

export type TerapeutaWithRelations = Terapeuta & TerapeutaRelations;
