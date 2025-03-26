import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {
  RespuestaRelevante
} from '../models';
import {ResultadoTestRepository} from '../repositories';

export class ResultadoTestRespuestaRelevanteController {
  constructor(
    @repository(ResultadoTestRepository) protected resultadoTestRepository: ResultadoTestRepository,
  ) { }

  @get('/resultado-tests/{id}/respuesta-relevantes', {
    responses: {
      '200': {
        description: 'Array of ResultadoTest has many RespuestaRelevante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RespuestaRelevante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RespuestaRelevante>,
  ): Promise<RespuestaRelevante[]> {
    return this.resultadoTestRepository.respuestasRelevantes(id).find(filter);
  }

  @authenticate('test')
  @post('/resultado-tests/{id}/respuesta-relevantes')
  @response(200, {
    description: 'Respuestas Relevantes',
    content: {'application/json': {schema: getModelSchemaRef(RespuestaRelevante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultadoTestId: {type: 'number'},
              respuestasRelevantes: {type: 'array', items: {type: 'object'}}
            },
            required: ['resultadoTestId', 'respuestasRelevantes']
          }
        },
      },
    })
    requestData: {resultadoTestId: number; respuestasRelevantes: RespuestaRelevante[]},
  ): Promise<RespuestaRelevante[]> {

    const {resultadoTestId, respuestasRelevantes} = requestData;
    const createdEntries: RespuestaRelevante[] = [];

    for (const respuesta of respuestasRelevantes) {
      const newEntry = await this.resultadoTestRepository.respuestasRelevantes(resultadoTestId).create({
        resultadoTestId: resultadoTestId,
        pregunta: respuesta.pregunta,
        preguntaNumero: respuesta.preguntaNumero,
        respuesta: respuesta.respuesta,
        respuestaValor: respuesta.respuestaValor,
      });
      createdEntries.push(newEntry);
    }
    return createdEntries;
  }

  @patch('/resultado-tests/{id}/respuesta-relevantes', {
    responses: {
      '200': {
        description: 'ResultadoTest.RespuestaRelevante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RespuestaRelevante, {partial: true}),
        },
      },
    })
    respuestaRelevante: Partial<RespuestaRelevante>,
    @param.query.object('where', getWhereSchemaFor(RespuestaRelevante)) where?: Where<RespuestaRelevante>,
  ): Promise<Count> {
    return this.resultadoTestRepository.respuestasRelevantes(id).patch(respuestaRelevante, where);
  }

  @del('/resultado-tests/{id}/respuesta-relevantes', {
    responses: {
      '200': {
        description: 'ResultadoTest.RespuestaRelevante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RespuestaRelevante)) where?: Where<RespuestaRelevante>,
  ): Promise<Count> {
    return this.resultadoTestRepository.respuestasRelevantes(id).delete(where);
  }
}
