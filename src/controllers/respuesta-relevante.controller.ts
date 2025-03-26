import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RespuestaRelevante} from '../models';
import {RespuestaRelevanteRepository} from '../repositories';

export class RespuestaRelevanteController {
  constructor(
    @repository(RespuestaRelevanteRepository)
    public respuestaRelevanteRepository : RespuestaRelevanteRepository,
  ) {}

  @post('/respuestas-relevantes')
  @response(200, {
    description: 'RespuestaRelevante model instance',
    content: {'application/json': {schema: getModelSchemaRef(RespuestaRelevante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RespuestaRelevante, {
            title: 'NewRespuestaRelevante',
            exclude: ['id'],
          }),
        },
      },
    })
    respuestaRelevante: Omit<RespuestaRelevante, 'id'>,
  ): Promise<RespuestaRelevante> {
    return this.respuestaRelevanteRepository.create(respuestaRelevante);
  }

  @get('/respuestas-relevantes/count')
  @response(200, {
    description: 'RespuestaRelevante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RespuestaRelevante) where?: Where<RespuestaRelevante>,
  ): Promise<Count> {
    return this.respuestaRelevanteRepository.count(where);
  }

  @get('/respuestas-relevantes')
  @response(200, {
    description: 'Array of RespuestaRelevante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RespuestaRelevante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RespuestaRelevante) filter?: Filter<RespuestaRelevante>,
  ): Promise<RespuestaRelevante[]> {
    return this.respuestaRelevanteRepository.find(filter);
  }

  @patch('/respuestas-relevantes')
  @response(200, {
    description: 'RespuestaRelevante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RespuestaRelevante, {partial: true}),
        },
      },
    })
    respuestaRelevante: RespuestaRelevante,
    @param.where(RespuestaRelevante) where?: Where<RespuestaRelevante>,
  ): Promise<Count> {
    return this.respuestaRelevanteRepository.updateAll(respuestaRelevante, where);
  }

  @get('/respuestas-relevantes/{id}')
  @response(200, {
    description: 'RespuestaRelevante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RespuestaRelevante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RespuestaRelevante, {exclude: 'where'}) filter?: FilterExcludingWhere<RespuestaRelevante>
  ): Promise<RespuestaRelevante> {
    return this.respuestaRelevanteRepository.findById(id, filter);
  }

  @patch('/respuestas-relevantes/{id}')
  @response(204, {
    description: 'RespuestaRelevante PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RespuestaRelevante, {partial: true}),
        },
      },
    })
    respuestaRelevante: RespuestaRelevante,
  ): Promise<void> {
    await this.respuestaRelevanteRepository.updateById(id, respuestaRelevante);
  }

  @put('/respuestas-relevantes/{id}')
  @response(204, {
    description: 'RespuestaRelevante PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() respuestaRelevante: RespuestaRelevante,
  ): Promise<void> {
    await this.respuestaRelevanteRepository.replaceById(id, respuestaRelevante);
  }

  @del('/respuestas-relevantes/{id}')
  @response(204, {
    description: 'RespuestaRelevante DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.respuestaRelevanteRepository.deleteById(id);
  }
}
