import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {TestPsicometrico} from '../models';
import {TestPsicometricoRepository} from '../repositories';

@authenticate('admin')
export class TestPsicometricoController {
  constructor(
    @repository(TestPsicometricoRepository)
    public testPsicometricoRepository: TestPsicometricoRepository,
  ) { }

  @post('/tests-psicometricos')
  @response(200, {
    description: 'TestPsicometrico model instance',
    content: {'application/json': {schema: getModelSchemaRef(TestPsicometrico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestPsicometrico, {
            title: 'NewTestPsicometrico',
            exclude: ['id'],
          }),
        },
      },
    })
    testPsicometrico: Omit<TestPsicometrico, 'id'>,
  ): Promise<TestPsicometrico> {
    return this.testPsicometricoRepository.create(testPsicometrico);
  }

  @get('/tests-psicometricos/count')
  @response(200, {
    description: 'TestPsicometrico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TestPsicometrico) where?: Where<TestPsicometrico>,
  ): Promise<Count> {
    return this.testPsicometricoRepository.count(where);
  }

  @authenticate.skip()
  @get('/tests-psicometricos')
  @response(200, {
    description: 'Array of TestPsicometrico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TestPsicometrico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TestPsicometrico) filter?: Filter<TestPsicometrico>,
  ): Promise<TestPsicometrico[]> {
    return this.testPsicometricoRepository.find(filter);
  }

  @patch('/tests-psicometricos')
  @response(200, {
    description: 'TestPsicometrico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestPsicometrico, {partial: true}),
        },
      },
    })
    testPsicometrico: TestPsicometrico,
    @param.where(TestPsicometrico) where?: Where<TestPsicometrico>,
  ): Promise<Count> {
    return this.testPsicometricoRepository.updateAll(testPsicometrico, where);
  }

  @get('/tests-psicometricos/{id}')
  @response(200, {
    description: 'TestPsicometrico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TestPsicometrico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TestPsicometrico, {exclude: 'where'}) filter?: FilterExcludingWhere<TestPsicometrico>
  ): Promise<TestPsicometrico> {
    return this.testPsicometricoRepository.findById(id, filter);
  }

  @patch('/tests-psicometricos/{id}')
  @response(204, {
    description: 'TestPsicometrico PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestPsicometrico, {partial: true}),
        },
      },
    })
    testPsicometrico: TestPsicometrico,
  ): Promise<void> {
    await this.testPsicometricoRepository.updateById(id, testPsicometrico);
  }

  @put('/tests-psicometricos/{id}')
  @response(204, {
    description: 'TestPsicometrico PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testPsicometrico: TestPsicometrico,
  ): Promise<void> {
    await this.testPsicometricoRepository.replaceById(id, testPsicometrico);
  }

  @del('/tests-psicometricos/{id}')
  @response(204, {
    description: 'TestPsicometrico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testPsicometricoRepository.deleteById(id);
  }
}
