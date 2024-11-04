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
import {ConsultaTest} from '../models';
import {ConsultaTestRepository} from '../repositories';

@authenticate('admin', 'therapist')
export class ConsultaTestPsicometricoController {
  constructor(
    @repository(ConsultaTestRepository)
    public consultaTestRepository: ConsultaTestRepository,
  ) { }

  @post('/consulta-tests')
  @response(200, {
    description: 'ConsultaTest model instance',
    content: {'application/json': {schema: getModelSchemaRef(ConsultaTest)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              consultaId: {type: 'number'},
              testPsicometricoId: {type: 'array', items: {type: 'number'}}
            },
            required: ['consultaId', 'testPsicometricoId']
          }
        },
      },
    })
    requestData: {consultaId: number; testPsicometricoId: number[]},
  ): Promise<ConsultaTest[]> {

    const {consultaId, testPsicometricoId} = requestData;
    const createdEntries: ConsultaTest[] = [];

    for (const testId of testPsicometricoId) {
      const newEntry = await this.consultaTestRepository.create({
        consultaId: consultaId,
        testPsicometricoId: testId,
      });
      createdEntries.push(newEntry);
    }
    return createdEntries;
  }

  @get('/consulta-tests/count')
  @response(200, {
    description: 'ConsultaTest model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ConsultaTest) where?: Where<ConsultaTest>,
  ): Promise<Count> {
    return this.consultaTestRepository.count(where);
  }

  @get('/consulta-tests')
  @response(200, {
    description: 'Array of ConsultaTest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ConsultaTest, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ConsultaTest) filter?: Filter<ConsultaTest>,
  ): Promise<ConsultaTest[]> {
    return this.consultaTestRepository.find(filter);
  }

  @patch('/consulta-tests')
  @response(200, {
    description: 'ConsultaTest PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaTest, {partial: true}),
        },
      },
    })
    consultaTest: ConsultaTest,
    @param.where(ConsultaTest) where?: Where<ConsultaTest>,
  ): Promise<Count> {
    return this.consultaTestRepository.updateAll(consultaTest, where);
  }

  @get('/consulta-tests/{id}')
  @response(200, {
    description: 'ConsultaTest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConsultaTest, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ConsultaTest, {exclude: 'where'}) filter?: FilterExcludingWhere<ConsultaTest>
  ): Promise<ConsultaTest> {
    return this.consultaTestRepository.findById(id, filter);
  }

  @patch('/consulta-tests/{id}')
  @response(204, {
    description: 'ConsultaTest PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaTest, {partial: true}),
        },
      },
    })
    consultaTest: ConsultaTest,
  ): Promise<void> {
    await this.consultaTestRepository.updateById(id, consultaTest);
  }

  @put('/consulta-tests/{id}')
  @response(204, {
    description: 'ConsultaTest PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() consultaTest: ConsultaTest,
  ): Promise<void> {
    await this.consultaTestRepository.replaceById(id, consultaTest);
  }

  @del('/consulta-tests/{id}')
  @response(204, {
    description: 'ConsultaTest DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.consultaTestRepository.deleteById(id);
  }
}
