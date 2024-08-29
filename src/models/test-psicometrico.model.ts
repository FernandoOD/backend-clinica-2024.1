import {Entity, model, property, hasMany} from '@loopback/repository';
import {ResultadoTest} from './resultado-test.model';

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

  @hasMany(() => ResultadoTest)
  resultadoTests: ResultadoTest[];

  constructor(data?: Partial<TestPsicometrico>) {
    super(data);
  }
}

export interface TestPsicometricoRelations {
  // describe navigational properties here
}

export type TestPsicometricoWithRelations = TestPsicometrico & TestPsicometricoRelations;
