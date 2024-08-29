import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ModuloPsicoeducativo,
  Terapeuta,
} from '../models';
import {ModuloPsicoeducativoRepository} from '../repositories';

export class ModuloPsicoeducativoTerapeutaController {
  constructor(
    @repository(ModuloPsicoeducativoRepository)
    public moduloPsicoeducativoRepository: ModuloPsicoeducativoRepository,
  ) { }

  @get('/modulo-psicoeducativos/{id}/terapeuta', {
    responses: {
      '200': {
        description: 'Terapeuta belonging to ModuloPsicoeducativo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Terapeuta),
          },
        },
      },
    },
  })
  async getTerapeuta(
    @param.path.number('id') id: typeof ModuloPsicoeducativo.prototype.id,
  ): Promise<Terapeuta> {
    return this.moduloPsicoeducativoRepository.terapeutaModulo(id);
  }
}
