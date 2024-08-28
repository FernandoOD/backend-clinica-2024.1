import {Entity, model, property} from '@loopback/repository';

@model()
export class ConsultaTest extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<ConsultaTest>) {
    super(data);
  }
}

export interface ConsultaTestRelations {
  // describe navigational properties here
}

export type ConsultaTestWithRelations = ConsultaTest & ConsultaTestRelations;
