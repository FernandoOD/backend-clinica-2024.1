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
EjercicioPractico,
PacienteEjercicioPractico,
Paciente,
} from '../models';
import {EjercicioPracticoRepository} from '../repositories';

export class EjercicioPracticoPacienteController {
  constructor(
    @repository(EjercicioPracticoRepository) protected ejercicioPracticoRepository: EjercicioPracticoRepository,
  ) { }

  @get('/ejercicio-practicos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'Array of EjercicioPractico has many Paciente through PacienteEjercicioPractico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Paciente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Paciente>,
  ): Promise<Paciente[]> {
    return this.ejercicioPracticoRepository.pacienteEjercicios(id).find(filter);
  }

  @post('/ejercicio-practicos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'create a Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Paciente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EjercicioPractico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paciente, {
            title: 'NewPacienteInEjercicioPractico',
            exclude: ['id'],
          }),
        },
      },
    }) paciente: Omit<Paciente, 'id'>,
  ): Promise<Paciente> {
    return this.ejercicioPracticoRepository.pacienteEjercicios(id).create(paciente);
  }

  @patch('/ejercicio-practicos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'EjercicioPractico.Paciente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paciente, {partial: true}),
        },
      },
    })
    paciente: Partial<Paciente>,
    @param.query.object('where', getWhereSchemaFor(Paciente)) where?: Where<Paciente>,
  ): Promise<Count> {
    return this.ejercicioPracticoRepository.pacienteEjercicios(id).patch(paciente, where);
  }

  @del('/ejercicio-practicos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'EjercicioPractico.Paciente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Paciente)) where?: Where<Paciente>,
  ): Promise<Count> {
    return this.ejercicioPracticoRepository.pacienteEjercicios(id).delete(where);
  }
}
