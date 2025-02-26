import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
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
import {PacienteEjercicioPractico} from '../models';
import {PacienteEjercicioPracticoRepository} from '../repositories';

@authenticate('admin', 'therapist')
export class PacienteEjercicioController {
  constructor(
    @repository(PacienteEjercicioPracticoRepository)
    public pacienteEjercicioPracticoRepository: PacienteEjercicioPracticoRepository,
  ) { }

  @post('/paciente-ejercicios-practicos')
  @response(200, {
    description: 'PacienteEjercicioPractico model instance',
    content: {'application/json': {schema: getModelSchemaRef(PacienteEjercicioPractico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              pacienteId: {type: 'number'},
              ejercicioPracticoId: {type: 'array', items: {type: 'number'}}
            },
            required: ['pacienteId', 'ejercicioPracticoId']
          }
        },
      },
    })
    requestData: {pacienteId: number; ejercicioPracticoId: number[]},
  ): Promise<PacienteEjercicioPractico[]> {

    const {pacienteId, ejercicioPracticoId} = requestData;
    const createdEntries: PacienteEjercicioPractico[] = [];

    for (const ejercicioId of ejercicioPracticoId) {
      const newEntry = await this.pacienteEjercicioPracticoRepository.create({
        pacienteId: pacienteId,
        ejercicioPracticoId: ejercicioId,
      });
      createdEntries.push(newEntry);
    }
    return createdEntries;
  }

  @get('/paciente-ejercicios-practicos/count')
  @response(200, {
    description: 'PacienteEjercicioPractico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PacienteEjercicioPractico) where?: Where<PacienteEjercicioPractico>,
  ): Promise<Count> {
    return this.pacienteEjercicioPracticoRepository.count(where);
  }

  @get('/paciente-ejercicios-practicos')
  @response(200, {
    description: 'Array of PacienteEjercicioPractico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PacienteEjercicioPractico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PacienteEjercicioPractico) filter?: Filter<PacienteEjercicioPractico>,
  ): Promise<PacienteEjercicioPractico[]> {
    return this.pacienteEjercicioPracticoRepository.find(filter);
  }

  @patch('/paciente-ejercicios-practicos')
  @response(200, {
    description: 'PacienteEjercicioPractico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PacienteEjercicioPractico, {partial: true}),
        },
      },
    })
    pacienteEjercicioPractico: PacienteEjercicioPractico,
    @param.where(PacienteEjercicioPractico) where?: Where<PacienteEjercicioPractico>,
  ): Promise<Count> {
    return this.pacienteEjercicioPracticoRepository.updateAll(pacienteEjercicioPractico, where);
  }

  @authenticate('patient')
  @get('/paciente-ejercicios-practicos/{id}')
  @response(200, {
    description: 'PacienteEjercicioPractico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PacienteEjercicioPractico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<PacienteEjercicioPractico[]> {
    return this.pacienteEjercicioPracticoRepository.find({
      where: {pacienteId: id},
    });
  }

  @patch('/paciente-ejercicios-practicos/{id}')
  @response(204, {
    description: 'PacienteEjercicioPractico PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PacienteEjercicioPractico, {partial: true}),
        },
      },
    })
    pacienteEjercicioPractico: PacienteEjercicioPractico,
  ): Promise<void> {
    await this.pacienteEjercicioPracticoRepository.updateById(id, pacienteEjercicioPractico);
  }

  @put('/paciente-ejercicios-practicos/{id}')
  @response(204, {
    description: 'PacienteEjercicioPractico PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pacienteEjercicioPractico: PacienteEjercicioPractico,
  ): Promise<void> {
    await this.pacienteEjercicioPracticoRepository.replaceById(id, pacienteEjercicioPractico);
  }

  @del('/paciente-ejercicios-practicos/{id}')
  @response(204, {
    description: 'PacienteEjercicioPractico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pacienteEjercicioPracticoRepository.deleteById(id);
  }
}
