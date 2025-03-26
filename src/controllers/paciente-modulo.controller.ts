import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where
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
import {PacienteModuloPsicoeducativo} from '../models';
import {PacienteModuloPsicoeducativoRepository} from '../repositories';

export class PacienteModuloController {
  constructor(
    @repository(PacienteModuloPsicoeducativoRepository)
    public pacienteModuloPsicoeducativoRepository: PacienteModuloPsicoeducativoRepository,
  ) { }
  @authenticate('admin', 'therapist')
  @post('/paciente-modulo-psicoeducativos')
  @response(200, {
    description: 'PacienteModuloPsicoeducativo model instance',
    content: {'application/json': {schema: getModelSchemaRef(PacienteModuloPsicoeducativo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              pacienteId: {type: 'number'},
              moduloPsicoeducativoId: {type: 'array', items: {type: 'number'}}
            },
            required: ['pacienteId', 'moduloPsicoeducativoId']
          }
        },
      },
    })
    pacienteModuloPsicoeducativo: Omit<PacienteModuloPsicoeducativo, 'id'>,
  ): Promise<PacienteModuloPsicoeducativo> {
    return this.pacienteModuloPsicoeducativoRepository.create(pacienteModuloPsicoeducativo);
  }


  @get('/paciente-modulo-psicoeducativos/count')
  @response(200, {
    description: 'PacienteModuloPsicoeducativo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PacienteModuloPsicoeducativo) where?: Where<PacienteModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.pacienteModuloPsicoeducativoRepository.count(where);
  }

  @authenticate('patient', 'therapist')
  @get('/paciente-modulos-psicoeducativos/{id}')
  @response(200, {
    description: 'Array of PacienteModuloPsicoeducativo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PacienteModuloPsicoeducativo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
  ): Promise<PacienteModuloPsicoeducativo[]> {
    return this.pacienteModuloPsicoeducativoRepository.find({
      where: {pacienteId: id},
    });
  }

  @patch('/paciente-modulo-psicoeducativos')
  @response(200, {
    description: 'PacienteModuloPsicoeducativo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PacienteModuloPsicoeducativo, {partial: true}),
        },
      },
    })
    pacienteModuloPsicoeducativo: PacienteModuloPsicoeducativo,
    @param.where(PacienteModuloPsicoeducativo) where?: Where<PacienteModuloPsicoeducativo>,
  ): Promise<Count> {
    return this.pacienteModuloPsicoeducativoRepository.updateAll(pacienteModuloPsicoeducativo, where);
  }

  @get('/paciente-modulo-psicoeducativos/{id}')
  @response(200, {
    description: 'PacienteModuloPsicoeducativo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PacienteModuloPsicoeducativo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PacienteModuloPsicoeducativo, {exclude: 'where'}) filter?: FilterExcludingWhere<PacienteModuloPsicoeducativo>
  ): Promise<PacienteModuloPsicoeducativo> {
    return this.pacienteModuloPsicoeducativoRepository.findById(id, filter);
  }

  @authenticate('patient')
  @patch('/paciente-modulo-psicoeducativos/{id}')
  @response(204, {
    description: 'PacienteModuloPsicoeducativo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PacienteModuloPsicoeducativo, {partial: true}),
        },
      },
    })
    pacienteModuloPsicoeducativo: PacienteModuloPsicoeducativo,
  ): Promise<void> {
    await this.pacienteModuloPsicoeducativoRepository.updateById(id, pacienteModuloPsicoeducativo);
  }

  @put('/paciente-modulo-psicoeducativos/{id}')
  @response(204, {
    description: 'PacienteModuloPsicoeducativo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pacienteModuloPsicoeducativo: PacienteModuloPsicoeducativo,
  ): Promise<void> {
    await this.pacienteModuloPsicoeducativoRepository.replaceById(id, pacienteModuloPsicoeducativo);
  }

  @del('/paciente-modulo-psicoeducativos/{id}')
  @response(204, {
    description: 'PacienteModuloPsicoeducativo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pacienteModuloPsicoeducativoRepository.deleteById(id);
  }
}
