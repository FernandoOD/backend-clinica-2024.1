import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mensaje,
  Terapeuta,
} from '../models';
import {MensajeRepository} from '../repositories';

export class MensajeTerapeutaController {
  constructor(
    @repository(MensajeRepository)
    public mensajeRepository: MensajeRepository,
  ) { }

  @get('/mensajes/{id}/terapeuta', {
    responses: {
      '200': {
        description: 'Terapeuta belonging to Mensaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Terapeuta),
          },
        },
      },
    },
  })
  async getTerapeuta(
    @param.path.number('id') id: typeof Mensaje.prototype.id,
  ): Promise<Terapeuta> {
    return this.mensajeRepository.terapeutaMensaje(id);
  }
}
