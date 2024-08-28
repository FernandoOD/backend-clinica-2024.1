import {Entity, model, property} from '@loopback/repository';

@model()
export class Consulta extends Entity {
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
  FechaConsulta?: string;

  @property({
    type: 'string',
  })
  NotasConsulta?: string;


  constructor(data?: Partial<Consulta>) {
    super(data);
  }
}

export interface ConsultaRelations {
  // describe navigational properties here
}

export type ConsultaWithRelations = Consulta & ConsultaRelations;
