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
  HistoriaClinica,
  EntradaHistoria,
} from '../models';
import {HistoriaClinicaRepository} from '../repositories';

export class HistoriaClinicaEntradaHistoriaController {
  constructor(
    @repository(HistoriaClinicaRepository) protected historiaClinicaRepository: HistoriaClinicaRepository,
  ) { }

  @get('/historia-clinicas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'Array of HistoriaClinica has many EntradaHistoria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EntradaHistoria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EntradaHistoria>,
  ): Promise<EntradaHistoria[]> {
    return this.historiaClinicaRepository.entradaHistorias(id).find(filter);
  }

  @post('/historia-clinicas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'HistoriaClinica model instance',
        content: {'application/json': {schema: getModelSchemaRef(EntradaHistoria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof HistoriaClinica.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntradaHistoria, {
            title: 'NewEntradaHistoriaInHistoriaClinica',
            exclude: ['id'],
            optional: ['historiaClinicaId']
          }),
        },
      },
    }) entradaHistoria: Omit<EntradaHistoria, 'id'>,
  ): Promise<EntradaHistoria> {
    return this.historiaClinicaRepository.entradaHistorias(id).create(entradaHistoria);
  }

  @patch('/historia-clinicas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'HistoriaClinica.EntradaHistoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntradaHistoria, {partial: true}),
        },
      },
    })
    entradaHistoria: Partial<EntradaHistoria>,
    @param.query.object('where', getWhereSchemaFor(EntradaHistoria)) where?: Where<EntradaHistoria>,
  ): Promise<Count> {
    return this.historiaClinicaRepository.entradaHistorias(id).patch(entradaHistoria, where);
  }

  @del('/historia-clinicas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'HistoriaClinica.EntradaHistoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EntradaHistoria)) where?: Where<EntradaHistoria>,
  ): Promise<Count> {
    return this.historiaClinicaRepository.entradaHistorias(id).delete(where);
  }
}
