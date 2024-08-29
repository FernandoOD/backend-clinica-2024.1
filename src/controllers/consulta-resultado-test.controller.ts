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
} from '@loopback/rest';
import {
  Consulta,
  ResultadoTest,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaResultadoTestController {
  constructor(
    @repository(ConsultaRepository) protected consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'Array of Consulta has many ResultadoTest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ResultadoTest)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ResultadoTest>,
  ): Promise<ResultadoTest[]> {
    return this.consultaRepository.resultadosTests(id).find(filter);
  }

  @post('/consultas/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'Consulta model instance',
        content: {'application/json': {schema: getModelSchemaRef(ResultadoTest)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Consulta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoTest, {
            title: 'NewResultadoTestInConsulta',
            exclude: ['id'],
            optional: ['consultaId']
          }),
        },
      },
    }) resultadoTest: Omit<ResultadoTest, 'id'>,
  ): Promise<ResultadoTest> {
    return this.consultaRepository.resultadosTests(id).create(resultadoTest);
  }

  @patch('/consultas/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'Consulta.ResultadoTest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoTest, {partial: true}),
        },
      },
    })
    resultadoTest: Partial<ResultadoTest>,
    @param.query.object('where', getWhereSchemaFor(ResultadoTest)) where?: Where<ResultadoTest>,
  ): Promise<Count> {
    return this.consultaRepository.resultadosTests(id).patch(resultadoTest, where);
  }

  @del('/consultas/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'Consulta.ResultadoTest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ResultadoTest)) where?: Where<ResultadoTest>,
  ): Promise<Count> {
    return this.consultaRepository.resultadosTests(id).delete(where);
  }
}
