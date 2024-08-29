import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ResultadoTest, ResultadoTestRelations, Consulta, TestPsicometrico} from '../models';
import {ConsultaRepository} from './consulta.repository';
import {TestPsicometricoRepository} from './test-psicometrico.repository';

export class ResultadoTestRepository extends DefaultCrudRepository<
  ResultadoTest,
  typeof ResultadoTest.prototype.id,
  ResultadoTestRelations
> {

  public readonly consultaTest: BelongsToAccessor<Consulta, typeof ResultadoTest.prototype.id>;

  public readonly testPsicometrico: BelongsToAccessor<TestPsicometrico, typeof ResultadoTest.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('TestPsicometricoRepository') protected testPsicometricoRepositoryGetter: Getter<TestPsicometricoRepository>,
  ) {
    super(ResultadoTest, dataSource);
    this.testPsicometrico = this.createBelongsToAccessorFor('testPsicometrico', testPsicometricoRepositoryGetter,);
    this.registerInclusionResolver('testPsicometrico', this.testPsicometrico.inclusionResolver);
    this.consultaTest = this.createBelongsToAccessorFor('consultaTest', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultaTest', this.consultaTest.inclusionResolver);
  }
}
