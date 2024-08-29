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
  Consulta,
} from '../models';
import {TerapeutaRepository} from '../repositories';

export class TerapeutaConsultaController {
  constructor(
    @repository(TerapeutaRepository) protected terapeutaRepository: TerapeutaRepository,
  ) { }

  @get('/terapeutas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Array of Terapeuta has many Consulta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consulta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Consulta>,
  ): Promise<Consulta[]> {
    return this.terapeutaRepository.consultas(id).find(filter);
  }

  @post('/terapeutas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Terapeuta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Terapeuta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsultaInTerapeuta',
            exclude: ['id'],
            optional: ['terapeutaId']
          }),
        },
      },
    }) consulta: Omit<Consulta, 'id'>,
  ): Promise<Consulta> {
    return this.terapeutaRepository.consultas(id).create(consulta);
  }

  @patch('/terapeutas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Terapeuta.Consulta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {partial: true}),
        },
      },
    })
    consulta: Partial<Consulta>,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.terapeutaRepository.consultas(id).patch(consulta, where);
  }

  @del('/terapeutas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Terapeuta.Consulta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.terapeutaRepository.consultas(id).delete(where);
  }
}
