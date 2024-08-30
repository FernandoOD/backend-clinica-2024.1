import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EjercicioPractico,
  Paciente,
} from '../models';
import {EjercicioPracticoRepository} from '../repositories';

export class EjercicioPracticoPacienteController {
  constructor(
    @repository(EjercicioPracticoRepository)
    public ejercicioPracticoRepository: EjercicioPracticoRepository,
  ) { }

  @get('/ejercicio-practicos/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to EjercicioPractico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paciente),
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.number('id') id: typeof EjercicioPractico.prototype.id,
  ): Promise<Paciente> {
    return this.ejercicioPracticoRepository.pacienteEjercicio(id);
  }
}
