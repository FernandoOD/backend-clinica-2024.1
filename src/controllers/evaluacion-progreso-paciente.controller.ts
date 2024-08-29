import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EvaluacionProgreso,
  Paciente,
} from '../models';
import {EvaluacionProgresoRepository} from '../repositories';

export class EvaluacionProgresoPacienteController {
  constructor(
    @repository(EvaluacionProgresoRepository)
    public evaluacionProgresoRepository: EvaluacionProgresoRepository,
  ) { }

  @get('/evaluacion-progresos/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to EvaluacionProgreso',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paciente),
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.number('id') id: typeof EvaluacionProgreso.prototype.id,
  ): Promise<Paciente> {
    return this.evaluacionProgresoRepository.progresoPaciente(id);
  }
}
