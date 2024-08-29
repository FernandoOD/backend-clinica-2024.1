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
  EvaluacionProgreso,
} from '../models';
import {TerapeutaRepository} from '../repositories';

export class TerapeutaEvaluacionProgresoController {
  constructor(
    @repository(TerapeutaRepository) protected terapeutaRepository: TerapeutaRepository,
  ) { }

  @get('/terapeutas/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Array of Terapeuta has many EvaluacionProgreso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EvaluacionProgreso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EvaluacionProgreso>,
  ): Promise<EvaluacionProgreso[]> {
    return this.terapeutaRepository.evaluacionProgresos(id).find(filter);
  }

  @post('/terapeutas/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Terapeuta model instance',
        content: {'application/json': {schema: getModelSchemaRef(EvaluacionProgreso)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Terapeuta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionProgreso, {
            title: 'NewEvaluacionProgresoInTerapeuta',
            exclude: ['id'],
            optional: ['terapeutaId']
          }),
        },
      },
    }) evaluacionProgreso: Omit<EvaluacionProgreso, 'id'>,
  ): Promise<EvaluacionProgreso> {
    return this.terapeutaRepository.evaluacionProgresos(id).create(evaluacionProgreso);
  }

  @patch('/terapeutas/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Terapeuta.EvaluacionProgreso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionProgreso, {partial: true}),
        },
      },
    })
    evaluacionProgreso: Partial<EvaluacionProgreso>,
    @param.query.object('where', getWhereSchemaFor(EvaluacionProgreso)) where?: Where<EvaluacionProgreso>,
  ): Promise<Count> {
    return this.terapeutaRepository.evaluacionProgresos(id).patch(evaluacionProgreso, where);
  }

  @del('/terapeutas/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Terapeuta.EvaluacionProgreso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EvaluacionProgreso)) where?: Where<EvaluacionProgreso>,
  ): Promise<Count> {
    return this.terapeutaRepository.evaluacionProgresos(id).delete(where);
  }
}
