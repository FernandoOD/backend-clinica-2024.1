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
  Consulta,
  NotaClinica,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaNotaClinicaController {
  constructor(
    @repository(ConsultaRepository) protected consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/nota-clinica', {
    responses: {
      '200': {
        description: 'Consulta has one NotaClinica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(NotaClinica),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<NotaClinica>,
  ): Promise<NotaClinica> {
    return this.consultaRepository.notaClinica(id).get(filter);
  }

  @post('/consultas/{id}/nota-clinica', {
    responses: {
      '200': {
        description: 'Consulta model instance',
        content: {'application/json': {schema: getModelSchemaRef(NotaClinica)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Consulta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotaClinica, {
            title: 'NewNotaClinicaInConsulta',
            exclude: ['id'],
            optional: ['consultaId']
          }),
        },
      },
    }) notaClinica: Omit<NotaClinica, 'id'>,
  ): Promise<NotaClinica> {
    return this.consultaRepository.notaClinica(id).create(notaClinica);
  }

  @patch('/consultas/{id}/nota-clinica', {
    responses: {
      '200': {
        description: 'Consulta.NotaClinica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotaClinica, {partial: true}),
        },
      },
    })
    notaClinica: Partial<NotaClinica>,
    @param.query.object('where', getWhereSchemaFor(NotaClinica)) where?: Where<NotaClinica>,
  ): Promise<Count> {
    return this.consultaRepository.notaClinica(id).patch(notaClinica, where);
  }

  @del('/consultas/{id}/nota-clinica', {
    responses: {
      '200': {
        description: 'Consulta.NotaClinica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(NotaClinica)) where?: Where<NotaClinica>,
  ): Promise<Count> {
    return this.consultaRepository.notaClinica(id).delete(where);
  }
}
