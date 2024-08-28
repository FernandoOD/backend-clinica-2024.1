import {Entity, model, property} from '@loopback/repository';

@model()
export class HistoriaClinica extends Entity {
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
  FechaCreacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;


  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;
