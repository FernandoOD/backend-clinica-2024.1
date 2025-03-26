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
ModuloPsicoeducativo,
PacienteModuloPsicoeducativo,
Paciente,
} from '../models';
import {ModuloPsicoeducativoRepository} from '../repositories';

export class ModuloPsicoeducativoPacienteController {
  constructor(
    @repository(ModuloPsicoeducativoRepository) protected moduloPsicoeducativoRepository: ModuloPsicoeducativoRepository,
  ) { }

  @get('/modulo-psicoeducativos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'Array of ModuloPsicoeducativo has many Paciente through PacienteModuloPsicoeducativo',
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
    return this.moduloPsicoeducativoRepository.modeloPsicoeducativoPacientes(id).find(filter);
  }

  @post('/modulo-psicoeducativos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'create a Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Paciente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ModuloPsicoeducativo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paciente, {
            title: 'NewPacienteInModuloPsicoeducativo',
            exclude: ['id'],
          }),
        },
      },
    }) paciente: Omit<Paciente, 'id'>,
  ): Promise<Paciente> {
    return this.moduloPsicoeducativoRepository.modeloPsicoeducativoPacientes(id).create(paciente);
  }

  @patch('/modulo-psicoeducativos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'ModuloPsicoeducativo.Paciente PATCH success count',
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
    return this.moduloPsicoeducativoRepository.modeloPsicoeducativoPacientes(id).patch(paciente, where);
  }

  @del('/modulo-psicoeducativos/{id}/pacientes', {
    responses: {
      '200': {
        description: 'ModuloPsicoeducativo.Paciente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Paciente)) where?: Where<Paciente>,
  ): Promise<Count> {
    return this.moduloPsicoeducativoRepository.modeloPsicoeducativoPacientes(id).delete(where);
  }
}
