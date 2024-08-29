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
  Terapeuta,
  Mensaje,
} from '../models';
import {TerapeutaRepository} from '../repositories';

export class TerapeutaMensajeController {
  constructor(
    @repository(TerapeutaRepository) protected terapeutaRepository: TerapeutaRepository,
  ) { }

  @get('/terapeutas/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Array of Terapeuta has many Mensaje',
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
    return this.terapeutaRepository.mensajes(id).find(filter);
  }

  @post('/terapeutas/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Terapeuta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Terapeuta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {
            title: 'NewMensajeInTerapeuta',
            exclude: ['id'],
            optional: ['terapeutaId']
          }),
        },
      },
    }) mensaje: Omit<Mensaje, 'id'>,
  ): Promise<Mensaje> {
    return this.terapeutaRepository.mensajes(id).create(mensaje);
  }

  @patch('/terapeutas/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Terapeuta.Mensaje PATCH success count',
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
    return this.terapeutaRepository.mensajes(id).patch(mensaje, where);
  }

  @del('/terapeutas/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Terapeuta.Mensaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mensaje)) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.terapeutaRepository.mensajes(id).delete(where);
  }
}
