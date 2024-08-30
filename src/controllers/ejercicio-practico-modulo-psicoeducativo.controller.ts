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
  ModuloPsicoeducativo,
} from '../models';
import {EjercicioPracticoRepository} from '../repositories';

export class EjercicioPracticoModuloPsicoeducativoController {
  constructor(
    @repository(EjercicioPracticoRepository)
    public ejercicioPracticoRepository: EjercicioPracticoRepository,
  ) { }

  @get('/ejercicio-practicos/{id}/modulo-psicoeducativo', {
    responses: {
      '200': {
        description: 'ModuloPsicoeducativo belonging to EjercicioPractico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ModuloPsicoeducativo),
          },
        },
      },
    },
  })
  async getModuloPsicoeducativo(
    @param.path.number('id') id: typeof EjercicioPractico.prototype.id,
  ): Promise<ModuloPsicoeducativo> {
    return this.ejercicioPracticoRepository.moduloPsicoeducativo(id);
  }
}
