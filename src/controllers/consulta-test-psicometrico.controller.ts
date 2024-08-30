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
ConsultaTest,
TestPsicometrico,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaTestPsicometricoController {
  constructor(
    @repository(ConsultaRepository) protected consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/test-psicometricos', {
    responses: {
      '200': {
        description: 'Array of Consulta has many TestPsicometrico through ConsultaTest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TestPsicometrico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TestPsicometrico>,
  ): Promise<TestPsicometrico[]> {
    return this.consultaRepository.testPsicometricos(id).find(filter);
  }

  @post('/consultas/{id}/test-psicometricos', {
    responses: {
      '200': {
        description: 'create a TestPsicometrico model instance',
        content: {'application/json': {schema: getModelSchemaRef(TestPsicometrico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Consulta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestPsicometrico, {
            title: 'NewTestPsicometricoInConsulta',
            exclude: ['id'],
          }),
        },
      },
    }) testPsicometrico: Omit<TestPsicometrico, 'id'>,
  ): Promise<TestPsicometrico> {
    return this.consultaRepository.testPsicometricos(id).create(testPsicometrico);
  }

  @patch('/consultas/{id}/test-psicometricos', {
    responses: {
      '200': {
        description: 'Consulta.TestPsicometrico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestPsicometrico, {partial: true}),
        },
      },
    })
    testPsicometrico: Partial<TestPsicometrico>,
    @param.query.object('where', getWhereSchemaFor(TestPsicometrico)) where?: Where<TestPsicometrico>,
  ): Promise<Count> {
    return this.consultaRepository.testPsicometricos(id).patch(testPsicometrico, where);
  }

  @del('/consultas/{id}/test-psicometricos', {
    responses: {
      '200': {
        description: 'Consulta.TestPsicometrico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TestPsicometrico)) where?: Where<TestPsicometrico>,
  ): Promise<Count> {
    return this.consultaRepository.testPsicometricos(id).delete(where);
  }
}
