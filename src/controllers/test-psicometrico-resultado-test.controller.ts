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
  TestPsicometrico,
  ResultadoTest,
} from '../models';
import {TestPsicometricoRepository} from '../repositories';

export class TestPsicometricoResultadoTestController {
  constructor(
    @repository(TestPsicometricoRepository) protected testPsicometricoRepository: TestPsicometricoRepository,
  ) { }

  @get('/test-psicometricos/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'Array of TestPsicometrico has many ResultadoTest',
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
    return this.testPsicometricoRepository.resultadoTests(id).find(filter);
  }

  @post('/test-psicometricos/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'TestPsicometrico model instance',
        content: {'application/json': {schema: getModelSchemaRef(ResultadoTest)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TestPsicometrico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoTest, {
            title: 'NewResultadoTestInTestPsicometrico',
            exclude: ['id'],
            optional: ['testPsicometricoId']
          }),
        },
      },
    }) resultadoTest: Omit<ResultadoTest, 'id'>,
  ): Promise<ResultadoTest> {
    return this.testPsicometricoRepository.resultadoTests(id).create(resultadoTest);
  }

  @patch('/test-psicometricos/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'TestPsicometrico.ResultadoTest PATCH success count',
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
    return this.testPsicometricoRepository.resultadoTests(id).patch(resultadoTest, where);
  }

  @del('/test-psicometricos/{id}/resultado-tests', {
    responses: {
      '200': {
        description: 'TestPsicometrico.ResultadoTest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ResultadoTest)) where?: Where<ResultadoTest>,
  ): Promise<Count> {
    return this.testPsicometricoRepository.resultadoTests(id).delete(where);
  }
}
