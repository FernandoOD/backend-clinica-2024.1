import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  NotaClinica,
  Consulta,
} from '../models';
import {NotaClinicaRepository} from '../repositories';

export class NotaClinicaConsultaController {
  constructor(
    @repository(NotaClinicaRepository)
    public notaClinicaRepository: NotaClinicaRepository,
  ) { }

  @get('/nota-clinicas/{id}/consulta', {
    responses: {
      '200': {
        description: 'Consulta belonging to NotaClinica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Consulta),
          },
        },
      },
    },
  })
  async getConsulta(
    @param.path.number('id') id: typeof NotaClinica.prototype.id,
  ): Promise<Consulta> {
    return this.notaClinicaRepository.consultaNota(id);
  }
}
