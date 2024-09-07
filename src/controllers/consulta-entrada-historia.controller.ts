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
  Consulta,
  EntradaHistoria,
} from '../models';
import { ConsultaRepository } from '../repositories';

export class ConsultaEntradaHistoriaController {
  constructor(
    @repository(ConsultaRepository) protected consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'Array of Consulta has many EntradaHistoria',
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
    return this.consultaRepository.entradaHistorias(id).find(filter);
  }

  @post('/consultas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'Consulta model instance',
        content: {'application/json': {schema: getModelSchemaRef(EntradaHistoria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Consulta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntradaHistoria, {
            title: 'NewEntradaHistoriaInConsulta',
            exclude: ['id'],
            optional: ['consultaId']
          }),
        },
      },
    }) entradaHistoria: Omit<EntradaHistoria, 'id'>,
  ): Promise<EntradaHistoria> {
    return this.consultaRepository.entradaHistorias(id).create(entradaHistoria);
  }

  @patch('/consultas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'Consulta.EntradaHistoria PATCH success count',
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
    return this.consultaRepository.entradaHistorias(id).patch(entradaHistoria, where);
  }

  @del('/consultas/{id}/entrada-historias', {
    responses: {
      '200': {
        description: 'Consulta.EntradaHistoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EntradaHistoria)) where?: Where<EntradaHistoria>,
  ): Promise<Count> {
    return this.consultaRepository.entradaHistorias(id).delete(where);
  }
}
