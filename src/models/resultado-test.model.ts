import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Consulta} from './consulta.model';
import {TestPsicometrico} from './test-psicometrico.model';

@model()
export class ResultadoTest extends Entity {
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
  FechaRealizacion?: string;

  @property({
    type: 'number',
    required: true,
  })
  Puntuacion: number;

  @property({
    type: 'string',
    default: 'LLenar durante consulta',
  })
  Interpretacion?: string;

  @belongsTo(() => Consulta, {name: 'consultaTest'})
  consultaId: number;

  @belongsTo(() => TestPsicometrico)
  testPsicometricoId: number;

  constructor(data?: Partial<ResultadoTest>) {
    super(data);
  }
}

export interface ResultadoTestRelations {
  // describe navigational properties here
}

export type ResultadoTestWithRelations = ResultadoTest & ResultadoTestRelations;
