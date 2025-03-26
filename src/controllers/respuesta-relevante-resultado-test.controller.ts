import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RespuestaRelevante,
  ResultadoTest,
} from '../models';
import {RespuestaRelevanteRepository} from '../repositories';

export class RespuestaRelevanteResultadoTestController {
  constructor(
    @repository(RespuestaRelevanteRepository)
    public respuestaRelevanteRepository: RespuestaRelevanteRepository,
  ) { }

  @get('/respuesta-relevantes/{id}/resultado-test', {
    responses: {
      '200': {
        description: 'ResultadoTest belonging to RespuestaRelevante',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ResultadoTest),
          },
        },
      },
    },
  })
  async getResultadoTest(
    @param.path.number('id') id: typeof RespuestaRelevante.prototype.id,
  ): Promise<ResultadoTest> {
    return this.respuestaRelevanteRepository.resultadoTest(id);
  }
}
