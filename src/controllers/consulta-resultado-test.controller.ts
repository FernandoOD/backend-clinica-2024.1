import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Consulta,
  ResultadoTest,
  TestSelect,
} from '../models';
import {ConsultaRepository, TestPsicometricoRepository} from '../repositories';
import {GeneralFunctionsService, JwtService} from '../services';

@authenticate('patient')
export class ConsultaResultadoTestController {
  constructor(
    @repository(ConsultaRepository) protected consultaRepository: ConsultaRepository,
    @repository(TestPsicometricoRepository) protected testPsicometricoRepository: TestPsicometricoRepository,
    @service(GeneralFunctionsService)
    public service: GeneralFunctionsService,
    @service(JwtService)
    public serviceJWT: JwtService
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

  @authenticate('test')
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

  @post('/generarToken', {
    responses: {
      '200': {
        description: 'Dar acceso para responder'
      }
    }
  })
  async generarToken(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestSelect),
        },
      },
    }) testSelect: TestSelect
  ): Promise<Object> {
    let test = await this.testPsicometricoRepository.findOne({where: {id: testSelect.id}})
    if (test) {
      let tk = this.serviceJWT.CrearTokenTest(testSelect.id, testSelect.nombre, testSelect.consultaId);
      return {
        test: test,
        token: tk,
        consultaId: testSelect.consultaId
      }
    } else {
      throw new HttpErrors[401]("Test no encontrado")
    }
  }
}
