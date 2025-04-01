import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {NotaClinica} from '../models';
import {NotaClinicaRepository, PacienteRepository} from '../repositories';

@authenticate('admin', 'therapist')
export class NotaClinicaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
    @repository(NotaClinicaRepository)
    public notaClinicaRepository: NotaClinicaRepository,
  ) { }

  @post('/notas-clinicas')
  @response(200, {
    description: 'NotaClinica model instance',
    content: {'application/json': {schema: getModelSchemaRef(NotaClinica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotaClinica, {
            title: 'NewNotaClinica',
            exclude: ['id'],
          }),
        },
      },
    })
    notaClinica: Omit<NotaClinica, 'id'>,
  ): Promise<NotaClinica> {
    return this.notaClinicaRepository.create(notaClinica);
  }

  @get('/notas-clinicas/count')
  @response(200, {
    description: 'NotaClinica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NotaClinica) where?: Where<NotaClinica>,
  ): Promise<Count> {
    return this.notaClinicaRepository.count(where);
  }

  @get('/pacientes/{id}/notas-clinicas', {
    responses: {
      '200': {
        description: 'Array of Paciente has many Consulta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NotaClinica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<NotaClinica>,
  ): Promise<NotaClinica[]> {
    return this.pacienteRepository.notasClinicas(id).find(filter);
  }

  @patch('/notas-clinicas')
  @response(200, {
    description: 'NotaClinica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotaClinica, {partial: true}),
        },
      },
    })
    notaClinica: NotaClinica,
    @param.where(NotaClinica) where?: Where<NotaClinica>,
  ): Promise<Count> {
    return this.notaClinicaRepository.updateAll(notaClinica, where);
  }

  @get('/notas-clinicas/{id}')
  @response(200, {
    description: 'NotaClinica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NotaClinica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(NotaClinica, {exclude: 'where'}) filter?: FilterExcludingWhere<NotaClinica>
  ): Promise<NotaClinica> {
    return this.notaClinicaRepository.findById(id, filter);
  }

  @patch('/notas-clinicas/{id}')
  @response(204, {
    description: 'NotaClinica PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotaClinica, {partial: true}),
        },
      },
    })
    notaClinica: NotaClinica,
  ): Promise<void> {
    await this.notaClinicaRepository.updateById(id, notaClinica);
  }

  @put('/notas-clinicas/{id}')
  @response(204, {
    description: 'NotaClinica PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() notaClinica: NotaClinica,
  ): Promise<void> {
    await this.notaClinicaRepository.replaceById(id, notaClinica);
  }

  @del('/notas-clinicas/{id}')
  @response(204, {
    description: 'NotaClinica DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.notaClinicaRepository.deleteById(id);
  }
}
