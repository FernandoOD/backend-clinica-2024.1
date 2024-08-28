import {Entity, model, property} from '@loopback/repository';

@model()
export class TestPsicometrico extends Entity {
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
  Descripcion: string;


  constructor(data?: Partial<TestPsicometrico>) {
    super(data);
  }
}

export interface TestPsicometricoRelations {
  // describe navigational properties here
}

export type TestPsicometricoWithRelations = TestPsicometrico & TestPsicometricoRelations;
