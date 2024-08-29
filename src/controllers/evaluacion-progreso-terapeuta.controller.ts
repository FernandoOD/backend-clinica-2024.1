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
  Terapeuta,
} from '../models';
import {EvaluacionProgresoRepository} from '../repositories';

export class EvaluacionProgresoTerapeutaController {
  constructor(
    @repository(EvaluacionProgresoRepository)
    public evaluacionProgresoRepository: EvaluacionProgresoRepository,
  ) { }

  @get('/evaluacion-progresos/{id}/terapeuta', {
    responses: {
      '200': {
        description: 'Terapeuta belonging to EvaluacionProgreso',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Terapeuta),
          },
        },
      },
    },
  })
  async getTerapeuta(
    @param.path.number('id') id: typeof EvaluacionProgreso.prototype.id,
  ): Promise<Terapeuta> {
    return this.evaluacionProgresoRepository.terapeutaProgreso(id);
  }
}
