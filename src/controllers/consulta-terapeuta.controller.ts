import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Consulta,
  Terapeuta,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaTerapeutaController {
  constructor(
    @repository(ConsultaRepository)
    public consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/terapeuta', {
    responses: {
      '200': {
        description: 'Terapeuta belonging to Consulta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Terapeuta),
          },
        },
      },
    },
  })
  async getTerapeuta(
    @param.path.number('id') id: typeof Consulta.prototype.id,
  ): Promise<Terapeuta> {
    return this.consultaRepository.terapeutaConsulta(id);
  }
}
