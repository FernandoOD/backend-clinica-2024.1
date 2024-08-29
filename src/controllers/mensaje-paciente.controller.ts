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
  Paciente,
} from '../models';
import {MensajeRepository} from '../repositories';

export class MensajePacienteController {
  constructor(
    @repository(MensajeRepository)
    public mensajeRepository: MensajeRepository,
  ) { }

  @get('/mensajes/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to Mensaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paciente),
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.number('id') id: typeof Mensaje.prototype.id,
  ): Promise<Paciente> {
    return this.mensajeRepository.pacienteMensaje(id);
  }
}
