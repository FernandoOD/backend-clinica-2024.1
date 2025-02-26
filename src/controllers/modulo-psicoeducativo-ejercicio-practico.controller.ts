import {authenticate} from '@loopback/authentication';
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
  requestBody
} from '@loopback/rest';
import {
  EjercicioPractico,
  ModuloPsicoeducativo,
} from '../models';
import {EjercicioPracticoRepository, ModuloPsicoeducativoRepository} from '../repositories';

@authenticate('admin', 'therapist')
export class ModuloPsicoeducativoEjercicioPracticoController {
  constructor(
    @repository(ModuloPsicoeducativoRepository) protected moduloPsicoeducativoRepository: ModuloPsicoeducativoRepository,
    @repository(EjercicioPracticoRepository) protected ejercicioPracticoRepository: EjercicioPracticoRepository,
  ) { }
  @authenticate('patient', 'admin', 'therapist')
  @get('/modulo-psicoeducativos/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'Array of ModuloPsicoeducativo has many EjercicioPractico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EjercicioPractico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EjercicioPractico>,
  ): Promise<EjercicioPractico[]> {
    return this.moduloPsicoeducativoRepository.ejercicioPracticos(id).find(filter);
  }

  @post('/modulo-psicoeducativos/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'ModuloPsicoeducativo model instance',
        content: {'application/json': {schema: getModelSchemaRef(EjercicioPractico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ModuloPsicoeducativo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EjercicioPractico, {
            title: 'NewEjercicioPracticoInModuloPsicoeducativo',
            exclude: ['id'],
            optional: ['moduloPsicoeducativoId']
          }),
        },
      },
    }) ejercicioPractico: Omit<EjercicioPractico, 'id'>,
  ): Promise<EjercicioPractico> {
    return this.moduloPsicoeducativoRepository.ejercicioPracticos(id).create(ejercicioPractico);
  }

  @patch('/modulo-psicoeducativos/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'ModuloPsicoeducativo.EjercicioPractico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EjercicioPractico, {partial: true}),
        },
      },
    })
    ejercicioPractico: Partial<EjercicioPractico>,
    @param.query.object('where', getWhereSchemaFor(EjercicioPractico)) where?: Where<EjercicioPractico>,
  ): Promise<Count> {
    return this.moduloPsicoeducativoRepository.ejercicioPracticos(id).patch(ejercicioPractico, where);
  }

  @del('/modulo-psicoeducativos/{id}/ejercicio-practicos', {
    responses: {
      '200': {
        description: 'ModuloPsicoeducativo.EjercicioPractico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EjercicioPractico)) where?: Where<EjercicioPractico>,
  ): Promise<Count> {
    return this.moduloPsicoeducativoRepository.ejercicioPracticos(id).delete(where);
  }

  @del('/ejercicios-practicos/{id}', {
    responses: {
      '204': {
        description: 'EjercicioPractico DELETE success',
      },
    },
  })
  async deleteById(
    @param.path.number('id') id: number,
  ): Promise<void> {
    await this.ejercicioPracticoRepository.deleteById(id);
  }
}
