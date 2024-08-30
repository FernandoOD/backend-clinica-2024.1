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
  HistoriaClinica,
  Paciente,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteHistoriaClinicaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/historia-clinica', {
    responses: {
      '200': {
        description: 'Paciente has one HistoriaClinica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HistoriaClinica),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica> {
    return this.pacienteRepository.historiaClinica(id).get(filter);
  }

  @post('/pacientes/{id}/historia-clinica', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistoriaClinica)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {
            title: 'NewHistoriaClinicaInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) historiaClinica: Omit<HistoriaClinica, 'id'>,
  ): Promise<HistoriaClinica> {
    return this.pacienteRepository.historiaClinica(id).create(historiaClinica);
  }

  @patch('/pacientes/{id}/historia-clinica', {
    responses: {
      '200': {
        description: 'Paciente.HistoriaClinica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: Partial<HistoriaClinica>,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.pacienteRepository.historiaClinica(id).patch(historiaClinica, where);
  }

  @del('/pacientes/{id}/historia-clinica', {
    responses: {
      '200': {
        description: 'Paciente.HistoriaClinica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.pacienteRepository.historiaClinica(id).delete(where);
  }
}
