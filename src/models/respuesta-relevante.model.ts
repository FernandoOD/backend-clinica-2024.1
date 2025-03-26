import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ResultadoTest} from './resultado-test.model';

@model()
export class RespuestaRelevante extends Entity {
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
  pregunta: string;

  @property({
    type: 'string',
    required: true,
  })
  respuesta: string;

  @property({
    type: 'number',
    required: true,
  })
  respuestaValor: number;

  @property({
    type: 'number',
    required: true,
  })
  preguntaNumero: number;


  @belongsTo(() => ResultadoTest)
  resultadoTestId: number;

  constructor(data?: Partial<RespuestaRelevante>) {
    super(data);
  }
}

export interface RespuestaRelevanteRelations {
  // describe navigational properties here
}

export type RespuestaRelevanteWithRelations = RespuestaRelevante & RespuestaRelevanteRelations;
