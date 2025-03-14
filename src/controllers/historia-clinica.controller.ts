import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {HistoriaClinica} from '../models';
import {HistoriaClinicaRepository} from '../repositories';

@authenticate('admin')
export class HistoriaClinicaController {
  constructor(
    @repository(HistoriaClinicaRepository)
    public historiaClinicaRepository: HistoriaClinicaRepository,
  ) { }

  @post('/historias-clinicas')
  @response(200, {
    description: 'HistoriaClinica model instance',
    content: {'application/json': {schema: getModelSchemaRef(HistoriaClinica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {
            title: 'NewHistoriaClinica',
            exclude: ['id'],
          }),
        },
      },
    })
    historiaClinica: Omit<HistoriaClinica, 'id'>,
  ): Promise<HistoriaClinica> {
    return this.historiaClinicaRepository.create(historiaClinica);
  }

  @get('/historias-clinicas/count')
  @response(200, {
    description: 'HistoriaClinica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HistoriaClinica) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.historiaClinicaRepository.count(where);
  }

  @authenticate.skip()
  @get('/historias-clinicas')
  @response(200, {
    description: 'Array of HistoriaClinica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HistoriaClinica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HistoriaClinica) filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica[]> {
    return this.historiaClinicaRepository.find(filter);
  }

  @patch('/historias-clinicas')
  @response(200, {
    description: 'HistoriaClinica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: HistoriaClinica,
    @param.where(HistoriaClinica) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.historiaClinicaRepository.updateAll(historiaClinica, where);
  }

  @authenticate.skip()
  @get('/historias-clinicas/{id}')
  @response(200, {
    description: 'HistoriaClinica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HistoriaClinica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HistoriaClinica, {exclude: 'where'}) filter?: FilterExcludingWhere<HistoriaClinica>
  ): Promise<HistoriaClinica> {
    return this.historiaClinicaRepository.findById(id, filter);
  }

  @patch('/historias-clinicas/{id}')
  @response(204, {
    description: 'HistoriaClinica PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: HistoriaClinica,
  ): Promise<void> {
    await this.historiaClinicaRepository.updateById(id, historiaClinica);
  }

  @put('/historias-clinicas/{id}')
  @response(204, {
    description: 'HistoriaClinica PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() historiaClinica: HistoriaClinica,
  ): Promise<void> {
    await this.historiaClinicaRepository.replaceById(id, historiaClinica);
  }

  @del('/historias-clinicas/{id}')
  @response(204, {
    description: 'HistoriaClinica DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.historiaClinicaRepository.deleteById(id);
  }
}
