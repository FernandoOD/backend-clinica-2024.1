import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Consulta} from './consulta.model';
import {TestPsicometrico} from './test-psicometrico.model';
import {RespuestaRelevante} from './respuesta-relevante.model';

@model({
  settings: {
    foreignKeys: {
      fk_test_psicometrico_id: {
        name: 'fk_test_psicometrico_id',
        entity: 'TestPsicometrico',
        entityKey: 'id',
        foreignKey: 'testPsicometricoId',
      },
      fk_consulta_id: {
        name: 'fk_consulta_id',
        entity: 'Consulta',
        entityKey: 'id',
        foreignKey: 'consultaId',
      },
    },
  },
})
export class ResultadoTest extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    jsonSchema: {
      format: 'date', // Restringe el formato a solo fecha 'YYYY-MM-DD'
    },
  })
  FechaRealizacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  Puntuacion: string;

  @property({
    type: 'string',
    default: 'LLenar durante consulta',
  })
  Interpretacion?: string;

  @belongsTo(() => Consulta, {name: 'consultaTest'})
  consultaId: number;

  @belongsTo(() => TestPsicometrico)
  testPsicometricoId: number;

  @hasMany(() => RespuestaRelevante)
  respuestasRelevantes: RespuestaRelevante[];

  constructor(data?: Partial<ResultadoTest>) {
    super(data);
  }
}

export interface ResultadoTestRelations {
  // describe navigational properties here
}

export type ResultadoTestWithRelations = ResultadoTest & ResultadoTestRelations;
