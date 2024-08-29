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
  Paciente,
  Mensaje,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteMensajeController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Array of Paciente has many Mensaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Mensaje>,
  ): Promise<Mensaje[]> {
    return this.pacienteRepository.mensajes(id).find(filter);
  }

  @post('/pacientes/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {
            title: 'NewMensajeInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) mensaje: Omit<Mensaje, 'id'>,
  ): Promise<Mensaje> {
    return this.pacienteRepository.mensajes(id).create(mensaje);
  }

  @patch('/pacientes/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Paciente.Mensaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {partial: true}),
        },
      },
    })
    mensaje: Partial<Mensaje>,
    @param.query.object('where', getWhereSchemaFor(Mensaje)) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.pacienteRepository.mensajes(id).patch(mensaje, where);
  }

  @del('/pacientes/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Paciente.Mensaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mensaje)) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.pacienteRepository.mensajes(id).delete(where);
  }
}
