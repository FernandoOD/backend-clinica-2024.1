import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistoriaClinica,
  Paciente,
} from '../models';
import {HistoriaClinicaRepository} from '../repositories';

export class HistoriaClinicaPacienteController {
  constructor(
    @repository(HistoriaClinicaRepository)
    public historiaClinicaRepository: HistoriaClinicaRepository,
  ) { }

  @get('/historia-clinicas/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to HistoriaClinica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paciente),
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.number('id') id: typeof HistoriaClinica.prototype.id,
  ): Promise<Paciente> {
    return this.historiaClinicaRepository.pacienteHistoria(id);
  }
}
