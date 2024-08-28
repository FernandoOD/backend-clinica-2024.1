import {Entity, model, property} from '@loopback/repository';

@model()
export class EjercicioPractico extends Entity {
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
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  Instrucciones: string;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaCreacion?: string;


  constructor(data?: Partial<EjercicioPractico>) {
    super(data);
  }
}

export interface EjercicioPracticoRelations {
  // describe navigational properties here
}

export type EjercicioPracticoWithRelations = EjercicioPractico & EjercicioPracticoRelations;
