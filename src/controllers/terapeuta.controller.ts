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
import {Terapeuta} from '../models';
import {TerapeutaRepository} from '../repositories';

@authenticate('admin')
export class TerapeutaController {
  constructor(
    @repository(TerapeutaRepository)
    public terapeutaRepository: TerapeutaRepository,
  ) { }

  @post('/terapeutas')
  @response(200, {
    description: 'Terapeuta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Terapeuta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Terapeuta, {
            title: 'NewTerapeuta',
            exclude: ['id'],
          }),
        },
      },
    })
    terapeuta: Omit<Terapeuta, 'id'>,
  ): Promise<Terapeuta> {
    return this.terapeutaRepository.create(terapeuta);
  }

  @get('/terapeutas/count')
  @response(200, {
    description: 'Terapeuta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Terapeuta) where?: Where<Terapeuta>,
  ): Promise<Count> {
    return this.terapeutaRepository.count(where);
  }

  @get('/terapeutas')
  @response(200, {
    description: 'Array of Terapeuta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Terapeuta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Terapeuta) filter?: Filter<Terapeuta>,
  ): Promise<Terapeuta[]> {
    return this.terapeutaRepository.find(filter);
  }

  @patch('/terapeutas')
  @response(200, {
    description: 'Terapeuta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Terapeuta, {partial: true}),
        },
      },
    })
    terapeuta: Terapeuta,
    @param.where(Terapeuta) where?: Where<Terapeuta>,
  ): Promise<Count> {
    return this.terapeutaRepository.updateAll(terapeuta, where);
  }

  @authenticate.skip()
  @get('/terapeutas/{id}')
  @response(200, {
    description: 'Terapeuta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Terapeuta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Terapeuta, {exclude: 'where'}) filter?: FilterExcludingWhere<Terapeuta>
  ): Promise<Terapeuta> {
    return this.terapeutaRepository.findById(id, filter);
  }

  @patch('/terapeutas/{id}')
  @response(204, {
    description: 'Terapeuta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Terapeuta, {partial: true}),
        },
      },
    })
    terapeuta: Terapeuta,
  ): Promise<void> {
    await this.terapeutaRepository.updateById(id, terapeuta);
  }

  @put('/terapeutas/{id}')
  @response(204, {
    description: 'Terapeuta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() terapeuta: Terapeuta,
  ): Promise<void> {
    await this.terapeutaRepository.replaceById(id, terapeuta);
  }

  @del('/terapeutas/{id}')
  @response(204, {
    description: 'Terapeuta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.terapeutaRepository.deleteById(id);
  }
}
