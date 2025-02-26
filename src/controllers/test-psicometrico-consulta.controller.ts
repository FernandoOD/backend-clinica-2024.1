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
ConsultaTest,
Consulta,
} from '../models';
import {TestPsicometricoRepository} from '../repositories';

export class TestPsicometricoConsultaController {
  constructor(
    @repository(TestPsicometricoRepository) protected testPsicometricoRepository: TestPsicometricoRepository,
  ) { }

  @get('/test-psicometricos/{id}/consultas', {
    responses: {
      '200': {
        description: 'Array of TestPsicometrico has many Consulta through ConsultaTest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consulta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Consulta>,
  ): Promise<Consulta[]> {
    return this.testPsicometricoRepository.consultas(id).find(filter);
  }

  @post('/test-psicometricos/{id}/consultas', {
    responses: {
      '200': {
        description: 'create a Consulta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TestPsicometrico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsultaInTestPsicometrico',
            exclude: ['id'],
          }),
        },
      },
    }) consulta: Omit<Consulta, 'id'>,
  ): Promise<Consulta> {
    return this.testPsicometricoRepository.consultas(id).create(consulta);
  }

  @patch('/test-psicometricos/{id}/consultas', {
    responses: {
      '200': {
        description: 'TestPsicometrico.Consulta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {partial: true}),
        },
      },
    })
    consulta: Partial<Consulta>,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.testPsicometricoRepository.consultas(id).patch(consulta, where);
  }

  @del('/test-psicometricos/{id}/consultas', {
    responses: {
      '200': {
        description: 'TestPsicometrico.Consulta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.testPsicometricoRepository.consultas(id).delete(where);
  }
}
