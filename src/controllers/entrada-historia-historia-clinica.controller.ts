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
  HistoriaClinica,
} from '../models';
import {EntradaHistoriaRepository} from '../repositories';

export class EntradaHistoriaHistoriaClinicaController {
  constructor(
    @repository(EntradaHistoriaRepository)
    public entradaHistoriaRepository: EntradaHistoriaRepository,
  ) { }

  @get('/entrada-historias/{id}/historia-clinica', {
    responses: {
      '200': {
        description: 'HistoriaClinica belonging to EntradaHistoria',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HistoriaClinica),
          },
        },
      },
    },
  })
  async getHistoriaClinica(
    @param.path.number('id') id: typeof EntradaHistoria.prototype.id,
  ): Promise<HistoriaClinica> {
    return this.entradaHistoriaRepository.historiaClinica(id);
  }
}
