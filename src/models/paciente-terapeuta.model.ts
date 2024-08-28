import {Entity, model, property} from '@loopback/repository';

@model()
export class PacienteTerapeuta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaInicio?: string;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaFin?: string;


  constructor(data?: Partial<PacienteTerapeuta>) {
    super(data);
  }
}

export interface PacienteTerapeutaRelations {
  // describe navigational properties here
}

export type PacienteTerapeutaWithRelations = PacienteTerapeuta & PacienteTerapeutaRelations;
