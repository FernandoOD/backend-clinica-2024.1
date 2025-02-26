import {Model, model, property} from '@loopback/repository';

@model()
export class TestSelect extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  consultaId: number;


  constructor(data?: Partial<TestSelect>) {
    super(data);
  }
}

export interface TestSelectRelations {
  // describe navigational properties here
}

export type TestSelectWithRelations = TestSelect & TestSelectRelations;
