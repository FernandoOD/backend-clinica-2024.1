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
PacienteModuloPsicoeducativo,
ModuloPsicoeducativo,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteModuloPsicoeducativoController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'Array of Paciente has many ModuloPsicoeducativo through PacienteModuloPsicoeducativo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ModuloPsicoeducativo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ModuloPsicoeducativo>,
  ): Promise<ModuloPsicoeducativo[]> {
    return this.pacienteRepository.pacienteModelosPsicoeducativos(id).find(filter);
  }

  @post('/pacientes/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'create a ModuloPsicoeducativo model instance',
        content: {'application/json': {schema: getModelSchemaRef(ModuloPsicoeducativo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloPsicoeducativo, {
            title: 'NewModuloPsicoeducativoInPaciente',
            exclude: ['id'],
          }),
        },
      },
    }) moduloPsicoeducativo: Omit<ModuloPsicoeducativo, 'id'>,
  ): Promise<ModuloPsicoeducativo> {
    return this.pacienteRepository.pacienteModelosPsicoeducativos(id).create(moduloPsicoeducativo);
  }

  @patch('/pacientes/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'Paciente.ModuloPsicoeducativo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloPsicoeducativo, {partial: true}),
        },
      },
    })
    moduloPsicoeducativo: Partial<ModuloPsicoeducativo>,
    @param.query.object('where', getWhereSchemaFor(ModuloPsicoeducativo)) where?: Where<ModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.pacienteRepository.pacienteModelosPsicoeducativos(id).patch(moduloPsicoeducativo, where);
  }

  @del('/pacientes/{id}/modulo-psicoeducativos', {
    responses: {
      '200': {
        description: 'Paciente.ModuloPsicoeducativo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ModuloPsicoeducativo)) where?: Where<ModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.pacienteRepository.pacienteModelosPsicoeducativos(id).delete(where);
  }
}
