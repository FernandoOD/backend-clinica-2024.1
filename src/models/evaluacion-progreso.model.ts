import {Entity, model, property} from '@loopback/repository';

@model()
export class EvaluacionProgreso extends Entity {
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
  FechaEvaluacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  ProgresoObservado: string;


  constructor(data?: Partial<EvaluacionProgreso>) {
    super(data);
  }
}

export interface EvaluacionProgresoRelations {
  // describe navigational properties here
}

export type EvaluacionProgresoWithRelations = EvaluacionProgreso & EvaluacionProgresoRelations;
