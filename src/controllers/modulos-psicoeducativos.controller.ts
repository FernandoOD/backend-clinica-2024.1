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
import {ModuloPsicoeducativo} from '../models';
import {ModuloPsicoeducativoRepository} from '../repositories';

@authenticate('admin', 'therapist')
export class ModulosPsicoeducativosController {
  constructor(
    @repository(ModuloPsicoeducativoRepository)
    public moduloPsicoeducativoRepository: ModuloPsicoeducativoRepository,
  ) { }

  @post('/modulos-psicoeducativos')
  @response(200, {
    description: 'ModuloPsicoeducativo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ModuloPsicoeducativo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloPsicoeducativo, {
            title: 'NewModuloPsicoeducativo',
            exclude: ['id'],
          }),
        },
      },
    })
    moduloPsicoeducativo: Omit<ModuloPsicoeducativo, 'id'>,
  ): Promise<ModuloPsicoeducativo> {
    return this.moduloPsicoeducativoRepository.create(moduloPsicoeducativo);
  }

  @get('/modulos-psicoeducativos/count')
  @response(200, {
    description: 'ModuloPsicoeducativo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ModuloPsicoeducativo) where?: Where<ModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.moduloPsicoeducativoRepository.count(where);
  }

  @authenticate('patient', 'admin', 'therapist')
  @get('/modulos-psicoeducativos')
  @response(200, {
    description: 'Array of ModuloPsicoeducativo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ModuloPsicoeducativo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ModuloPsicoeducativo) filter?: Filter<ModuloPsicoeducativo>,
  ): Promise<ModuloPsicoeducativo[]> {
    return this.moduloPsicoeducativoRepository.find(filter);
  }

  @patch('/modulos-psicoeducativos')
  @response(200, {
    description: 'ModuloPsicoeducativo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloPsicoeducativo, {partial: true}),
        },
      },
    })
    moduloPsicoeducativo: ModuloPsicoeducativo,
    @param.where(ModuloPsicoeducativo) where?: Where<ModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.moduloPsicoeducativoRepository.updateAll(moduloPsicoeducativo, where);
  }

  @authenticate('patient', 'admin', 'therapist')
  @get('/modulos-psicoeducativos/{id}')
  @response(200, {
    description: 'ModuloPsicoeducativo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ModuloPsicoeducativo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ModuloPsicoeducativo, {exclude: 'where'}) filter?: FilterExcludingWhere<ModuloPsicoeducativo>
  ): Promise<ModuloPsicoeducativo> {
    return this.moduloPsicoeducativoRepository.findById(id, filter);
  }

  @patch('/modulos-psicoeducativos/{id}')
  @response(204, {
    description: 'ModuloPsicoeducativo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloPsicoeducativo, {partial: true}),
        },
      },
    })
    moduloPsicoeducativo: ModuloPsicoeducativo,
  ): Promise<void> {
    await this.moduloPsicoeducativoRepository.updateById(id, moduloPsicoeducativo);
  }

  @put('/modulos-psicoeducativos/{id}')
  @response(204, {
    description: 'ModuloPsicoeducativo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() moduloPsicoeducativo: ModuloPsicoeducativo,
  ): Promise<void> {
    await this.moduloPsicoeducativoRepository.replaceById(id, moduloPsicoeducativo);
  }

  @del('/modulos-psicoeducativos/{id}')
  @response(204, {
    description: 'ModuloPsicoeducativo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.moduloPsicoeducativoRepository.deleteById(id);
  }
}
