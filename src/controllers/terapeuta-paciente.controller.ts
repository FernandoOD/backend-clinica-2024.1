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
PacienteTerapeuta,
Paciente,
} from '../models';
import {TerapeutaRepository} from '../repositories';

export class TerapeutaPacienteController {
  constructor(
    @repository(TerapeutaRepository) protected terapeutaRepository: TerapeutaRepository,
  ) { }

  @get('/terapeutas/{id}/pacientes', {
    responses: {
      '200': {
        description: 'Array of Terapeuta has many Paciente through PacienteTerapeuta',
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
    return this.terapeutaRepository.pacientes(id).find(filter);
  }

  @post('/terapeutas/{id}/pacientes', {
    responses: {
      '200': {
        description: 'create a Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Paciente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Terapeuta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paciente, {
            title: 'NewPacienteInTerapeuta',
            exclude: ['id'],
          }),
        },
      },
    }) paciente: Omit<Paciente, 'id'>,
  ): Promise<Paciente> {
    return this.terapeutaRepository.pacientes(id).create(paciente);
  }

  @patch('/terapeutas/{id}/pacientes', {
    responses: {
      '200': {
        description: 'Terapeuta.Paciente PATCH success count',
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
    return this.terapeutaRepository.pacientes(id).patch(paciente, where);
  }

  @del('/terapeutas/{id}/pacientes', {
    responses: {
      '200': {
        description: 'Terapeuta.Paciente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Paciente)) where?: Where<Paciente>,
  ): Promise<Count> {
    return this.terapeutaRepository.pacientes(id).delete(where);
  }
}
