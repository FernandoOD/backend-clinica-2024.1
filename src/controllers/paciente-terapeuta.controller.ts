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
import {PacienteTerapeuta} from '../models';
import {PacienteTerapeutaRepository} from '../repositories';

@authenticate('admin')
export class PacienteTerapeutaController {
  constructor(
    @repository(PacienteTerapeutaRepository)
    public pacienteTerapeutaRepository: PacienteTerapeutaRepository,
  ) { }

  @post('/paciente-terapeutas')
  @response(200, {
    description: 'PacienteTerapeuta model instance',
    content: {'application/json': {schema: getModelSchemaRef(PacienteTerapeuta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PacienteTerapeuta, {
            title: 'NewPacienteTerapeuta',
            exclude: ['id'],
          }),
        },
      },
    })
    pacienteTerapeuta: Omit<PacienteTerapeuta, 'id'>,
  ): Promise<PacienteTerapeuta> {
    return this.pacienteTerapeutaRepository.create(pacienteTerapeuta);
  }

  @get('/paciente-terapeutas/count')
  @response(200, {
    description: 'PacienteTerapeuta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PacienteTerapeuta) where?: Where<PacienteTerapeuta>,
  ): Promise<Count> {
    return this.pacienteTerapeutaRepository.count(where);
  }

  @authenticate.skip()
  @get('/paciente-terapeutas')
  @response(200, {
    description: 'Array of PacienteTerapeuta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PacienteTerapeuta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PacienteTerapeuta) filter?: Filter<PacienteTerapeuta>,
  ): Promise<PacienteTerapeuta[]> {
    return this.pacienteTerapeutaRepository.find(filter);
  }

  @patch('/paciente-terapeutas')
  @response(200, {
    description: 'PacienteTerapeuta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PacienteTerapeuta, {partial: true}),
        },
      },
    })
    pacienteTerapeuta: PacienteTerapeuta,
    @param.where(PacienteTerapeuta) where?: Where<PacienteTerapeuta>,
  ): Promise<Count> {
    return this.pacienteTerapeutaRepository.updateAll(pacienteTerapeuta, where);
  }

  @authenticate.skip()
  @get('/paciente-terapeutas/{id}')
  @response(200, {
    description: 'PacienteTerapeuta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PacienteTerapeuta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PacienteTerapeuta, {exclude: 'where'}) filter?: FilterExcludingWhere<PacienteTerapeuta>
  ): Promise<PacienteTerapeuta> {
    return this.pacienteTerapeutaRepository.findById(id, filter);
  }

  @patch('/paciente-terapeutas/{id}')
  @response(204, {
    description: 'PacienteTerapeuta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PacienteTerapeuta, {partial: true}),
        },
      },
    })
    pacienteTerapeuta: PacienteTerapeuta,
  ): Promise<void> {
    await this.pacienteTerapeutaRepository.updateById(id, pacienteTerapeuta);
  }

  @put('/paciente-terapeutas/{id}')
  @response(204, {
    description: 'PacienteTerapeuta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pacienteTerapeuta: PacienteTerapeuta,
  ): Promise<void> {
    await this.pacienteTerapeutaRepository.replaceById(id, pacienteTerapeuta);
  }

  @del('/paciente-terapeutas/{id}')
  @response(204, {
    description: 'PacienteTerapeuta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pacienteTerapeutaRepository.deleteById(id);
  }

  @get('/pacientes/{id}/terapeuta')
  @response(200, {
    description: 'Encontrar Terapeuta Por ID Paciente',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PacienteTerapeuta, {includeRelations: true}),
      },
    },
  })
  async findTerapeutaByPacienteId(
    @param.path.number('id') pacienteId: number,
  ): Promise<PacienteTerapeuta | null> {
    return this.pacienteTerapeutaRepository.findOne({
      where: {pacienteId: pacienteId, FechaFin: "0000-00-00"},
    });
  }
}
