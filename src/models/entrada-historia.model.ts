import {Entity, model, property} from '@loopback/repository';

@model()
export class EntradaHistoria extends Entity {
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
  FechaEntrada?: string;

  @property({
    type: 'string',
    required: true,
  })
  Detalles: string;


  constructor(data?: Partial<EntradaHistoria>) {
    super(data);
  }
}

export interface EntradaHistoriaRelations {
  // describe navigational properties here
}

export type EntradaHistoriaWithRelations = EntradaHistoria & EntradaHistoriaRelations;
