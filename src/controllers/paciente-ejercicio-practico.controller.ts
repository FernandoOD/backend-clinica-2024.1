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
PacienteEjercicioPractico,
EjercicioPractico,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteEjercicioPracticoController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'Array of Paciente has many EjercicioPractico through PacienteEjercicioPractico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EjercicioPractico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EjercicioPractico>,
  ): Promise<EjercicioPractico[]> {
    return this.pacienteRepository.ejercicioPracticos(id).find(filter);
  }

  @post('/pacientes/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'create a EjercicioPractico model instance',
        content: {'application/json': {schema: getModelSchemaRef(EjercicioPractico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EjercicioPractico, {
            title: 'NewEjercicioPracticoInPaciente',
            exclude: ['id'],
          }),
        },
      },
    }) ejercicioPractico: Omit<EjercicioPractico, 'id'>,
  ): Promise<EjercicioPractico> {
    return this.pacienteRepository.ejercicioPracticos(id).create(ejercicioPractico);
  }

  @patch('/pacientes/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'Paciente.EjercicioPractico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EjercicioPractico, {partial: true}),
        },
      },
    })
    ejercicioPractico: Partial<EjercicioPractico>,
    @param.query.object('where', getWhereSchemaFor(EjercicioPractico)) where?: Where<EjercicioPractico>,
  ): Promise<Count> {
    return this.pacienteRepository.ejercicioPracticos(id).patch(ejercicioPractico, where);
  }

  @del('/pacientes/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'Paciente.EjercicioPractico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EjercicioPractico)) where?: Where<EjercicioPractico>,
  ): Promise<Count> {
    return this.pacienteRepository.ejercicioPracticos(id).delete(where);
  }
}
