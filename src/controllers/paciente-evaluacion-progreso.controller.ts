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
  Paciente,
  EvaluacionProgreso,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteEvaluacionProgresoController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Array of Paciente has many EvaluacionProgreso',
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
    return this.pacienteRepository.evaluacionesDelProgreso(id).find(filter);
  }

  @post('/pacientes/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(EvaluacionProgreso)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionProgreso, {
            title: 'NewEvaluacionProgresoInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) evaluacionProgreso: Omit<EvaluacionProgreso, 'id'>,
  ): Promise<EvaluacionProgreso> {
    return this.pacienteRepository.evaluacionesDelProgreso(id).create(evaluacionProgreso);
  }

  @patch('/pacientes/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Paciente.EvaluacionProgreso PATCH success count',
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
    return this.pacienteRepository.evaluacionesDelProgreso(id).patch(evaluacionProgreso, where);
  }

  @del('/pacientes/{id}/evaluacion-progresos', {
    responses: {
      '200': {
        description: 'Paciente.EvaluacionProgreso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EvaluacionProgreso)) where?: Where<EvaluacionProgreso>,
  ): Promise<Count> {
    return this.pacienteRepository.evaluacionesDelProgreso(id).delete(where);
  }
}
