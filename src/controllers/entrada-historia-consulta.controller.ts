import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EntradaHistoria,
  Consulta,
} from '../models';
import {EntradaHistoriaRepository} from '../repositories';

export class EntradaHistoriaConsultaController {
  constructor(
    @repository(EntradaHistoriaRepository)
    public entradaHistoriaRepository: EntradaHistoriaRepository,
  ) { }

  @get('/entrada-historias/{id}/consulta', {
    responses: {
      '200': {
        description: 'Consulta belonging to EntradaHistoria',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Consulta),
          },
        },
      },
    },
  })
  async getConsulta(
    @param.path.number('id') id: typeof EntradaHistoria.prototype.id,
  ): Promise<Consulta> {
    return this.entradaHistoriaRepository.consulta(id);
  }
}
