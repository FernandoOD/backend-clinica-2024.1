import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ResultadoTest,
  TestPsicometrico,
} from '../models';
import {ResultadoTestRepository} from '../repositories';

export class ResultadoTestTestPsicometricoController {
  constructor(
    @repository(ResultadoTestRepository)
    public resultadoTestRepository: ResultadoTestRepository,
  ) { }

  @get('/resultado-tests/{id}/test-psicometrico', {
    responses: {
      '200': {
        description: 'TestPsicometrico belonging to ResultadoTest',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TestPsicometrico),
          },
        },
      },
    },
  })
  async getTestPsicometrico(
    @param.path.number('id') id: typeof ResultadoTest.prototype.id,
  ): Promise<TestPsicometrico> {
    return this.resultadoTestRepository.testPsicometrico(id);
  }
}
