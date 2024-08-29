import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ResultadoTest,
  Consulta,
} from '../models';
import {ResultadoTestRepository} from '../repositories';

export class ResultadoTestConsultaController {
  constructor(
    @repository(ResultadoTestRepository)
    public resultadoTestRepository: ResultadoTestRepository,
  ) { }

  @get('/resultado-tests/{id}/consulta', {
    responses: {
      '200': {
        description: 'Consulta belonging to ResultadoTest',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Consulta),
          },
        },
      },
    },
  })
  async getConsulta(
    @param.path.number('id') id: typeof ResultadoTest.prototype.id,
  ): Promise<Consulta> {
    return this.resultadoTestRepository.consultaTest(id);
  }
}
