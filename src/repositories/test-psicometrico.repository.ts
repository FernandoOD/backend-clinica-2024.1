import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {TestPsicometrico, TestPsicometricoRelations, ResultadoTest} from '../models';
import {ResultadoTestRepository} from './resultado-test.repository';

export class TestPsicometricoRepository extends DefaultCrudRepository<
  TestPsicometrico,
  typeof TestPsicometrico.prototype.id,
  TestPsicometricoRelations
> {

  public readonly resultadoTests: HasManyRepositoryFactory<ResultadoTest, typeof TestPsicometrico.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ResultadoTestRepository') protected resultadoTestRepositoryGetter: Getter<ResultadoTestRepository>,
  ) {
    super(TestPsicometrico, dataSource);
    this.resultadoTests = this.createHasManyRepositoryFactoryFor('resultadoTests', resultadoTestRepositoryGetter,);
    this.registerInclusionResolver('resultadoTests', this.resultadoTests.inclusionResolver);
  }
}
