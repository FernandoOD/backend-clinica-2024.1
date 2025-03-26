import {authenticate} from '@loopback/authentication';
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
  Paciente,
} from '../models';
import {PacienteRepository} from '../repositories';

@authenticate('admin', 'therapist')
export class PacienteConsultaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }
  @authenticate('patient', 'therapist')
  @get('/pacientes/{id}/consultas', {
    responses: {
      '200': {
        description: 'Array of Paciente has many Consulta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consulta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Consulta>,
  ): Promise<Consulta[]> {
    return this.pacienteRepository.consultas(id).find(filter);
  }

  @post('/pacientes/{id}/consultas', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsultaInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) consulta: Omit<Consulta, 'id'>,
  ): Promise<Consulta> {
    return this.pacienteRepository.consultas(id).create(consulta);
  }

  @patch('/pacientes/{id}/consultas', {
    responses: {
      '200': {
        description: 'Paciente.Consulta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {partial: true}),
        },
      },
    })
    consulta: Partial<Consulta>,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.pacienteRepository.consultas(id).patch(consulta, where);
  }

  @del('/pacientes/{id}/consultas', {
    responses: {
      '200': {
        description: 'Paciente.Consulta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.pacienteRepository.consultas(id).delete(where);
  }
}
