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
import {Paciente} from '../models';
import {PacienteRepository} from '../repositories';

@authenticate('admin')
export class PacienteController {
  constructor(
    @repository(PacienteRepository)
    public pacienteRepository: PacienteRepository,
  ) { }

  @post('/pacientes')
  @response(200, {
    description: 'Paciente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Paciente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paciente, {
            title: 'NewPaciente',
            exclude: ['id'],
          }),
        },
      },
    })
    paciente: Omit<Paciente, 'id'>,
  ): Promise<Paciente> {
    return this.pacienteRepository.create(paciente);
  }

  @get('/pacientes/count')
  @response(200, {
    description: 'Paciente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Paciente) where?: Where<Paciente>,
  ): Promise<Count> {
    return this.pacienteRepository.count(where);
  }

  @authenticate.skip()
  @get('/pacientes')
  @response(200, {
    description: 'Array of Paciente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Paciente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Paciente) filter?: Filter<Paciente>,
  ): Promise<Paciente[]> {
    return this.pacienteRepository.find(filter);
  }

  @patch('/pacientes')
  @response(200, {
    description: 'Paciente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paciente, {partial: true}),
        },
      },
    })
    paciente: Paciente,
    @param.where(Paciente) where?: Where<Paciente>,
  ): Promise<Count> {
    return this.pacienteRepository.updateAll(paciente, where);
  }

  @authenticate.skip()
  @get('/pacientes/{id}')
  @response(200, {
    description: 'Paciente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Paciente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Paciente, {exclude: 'where'}) filter?: FilterExcludingWhere<Paciente>
  ): Promise<Paciente> {
    return this.pacienteRepository.findById(id, filter);
  }

  @patch('/pacientes/{id}')
  @response(204, {
    description: 'Paciente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paciente, {partial: true}),
        },
      },
    })
    paciente: Paciente,
  ): Promise<void> {
    await this.pacienteRepository.updateById(id, paciente);
  }

  @put('/pacientes/{id}')
  @response(204, {
    description: 'Paciente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() paciente: Paciente,
  ): Promise<void> {
    await this.pacienteRepository.replaceById(id, paciente);
  }

  @del('/pacientes/{id}')
  @response(204, {
    description: 'Paciente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pacienteRepository.deleteById(id);
  }
}
