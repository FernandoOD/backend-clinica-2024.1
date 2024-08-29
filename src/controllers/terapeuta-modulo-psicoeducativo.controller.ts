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
  ModuloPsicoeducativo,
} from '../models';
import {TerapeutaRepository} from '../repositories';

export class TerapeutaModuloPsicoeducativoController {
  constructor(
    @repository(TerapeutaRepository) protected terapeutaRepository: TerapeutaRepository,
  ) { }

  @get('/terapeutas/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'Array of Terapeuta has many ModuloPsicoeducativo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ModuloPsicoeducativo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ModuloPsicoeducativo>,
  ): Promise<ModuloPsicoeducativo[]> {
    return this.terapeutaRepository.modulosPsicoeducativos(id).find(filter);
  }

  @post('/terapeutas/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'Terapeuta model instance',
        content: {'application/json': {schema: getModelSchemaRef(ModuloPsicoeducativo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Terapeuta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloPsicoeducativo, {
            title: 'NewModuloPsicoeducativoInTerapeuta',
            exclude: ['id'],
            optional: ['terapeutaId']
          }),
        },
      },
    }) moduloPsicoeducativo: Omit<ModuloPsicoeducativo, 'id'>,
  ): Promise<ModuloPsicoeducativo> {
    return this.terapeutaRepository.modulosPsicoeducativos(id).create(moduloPsicoeducativo);
  }

  @patch('/terapeutas/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'Terapeuta.ModuloPsicoeducativo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloPsicoeducativo, {partial: true}),
        },
      },
    })
    moduloPsicoeducativo: Partial<ModuloPsicoeducativo>,
    @param.query.object('where', getWhereSchemaFor(ModuloPsicoeducativo)) where?: Where<ModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.terapeutaRepository.modulosPsicoeducativos(id).patch(moduloPsicoeducativo, where);
  }

  @del('/terapeutas/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'Terapeuta.ModuloPsicoeducativo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ModuloPsicoeducativo)) where?: Where<ModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.terapeutaRepository.modulosPsicoeducativos(id).delete(where);
  }
}
