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
PacienteTerapeuta,
Terapeuta,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteTerapeutaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/terapeutas', {
    responses: {
      '200': {
        description: 'Array of Paciente has many Terapeuta through PacienteTerapeuta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Terapeuta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Terapeuta>,
  ): Promise<Terapeuta[]> {
    return this.pacienteRepository.terapeutas(id).find(filter);
  }

  @post('/pacientes/{id}/terapeutas', {
    responses: {
      '200': {
        description: 'create a Terapeuta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Terapeuta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Terapeuta, {
            title: 'NewTerapeutaInPaciente',
            exclude: ['id'],
          }),
        },
      },
    }) terapeuta: Omit<Terapeuta, 'id'>,
  ): Promise<Terapeuta> {
    return this.pacienteRepository.terapeutas(id).create(terapeuta);
  }

  @patch('/pacientes/{id}/terapeutas', {
    responses: {
      '200': {
        description: 'Paciente.Terapeuta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Terapeuta, {partial: true}),
        },
      },
    })
    terapeuta: Partial<Terapeuta>,
    @param.query.object('where', getWhereSchemaFor(Terapeuta)) where?: Where<Terapeuta>,
  ): Promise<Count> {
    return this.pacienteRepository.terapeutas(id).patch(terapeuta, where);
  }

  @del('/pacientes/{id}/terapeutas', {
    responses: {
      '200': {
        description: 'Paciente.Terapeuta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Terapeuta)) where?: Where<Terapeuta>,
  ): Promise<Count> {
    return this.pacienteRepository.terapeutas(id).delete(where);
  }
}
