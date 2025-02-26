import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {TestPsicometrico, TestPsicometricoRelations, ResultadoTest, Consulta, ConsultaTest} from '../models';
import {ResultadoTestRepository} from './resultado-test.repository';
import {ConsultaTestRepository} from './consulta-test.repository';
import {ConsultaRepository} from './consulta.repository';

export class TestPsicometricoRepository extends DefaultCrudRepository<
  TestPsicometrico,
  typeof TestPsicometrico.prototype.id,
  TestPsicometricoRelations
> {

  public readonly resultadoTests: HasManyRepositoryFactory<ResultadoTest, typeof TestPsicometrico.prototype.id>;

  public readonly consultas: HasManyThroughRepositoryFactory<Consulta, typeof Consulta.prototype.id,
          ConsultaTest,
          typeof TestPsicometrico.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ResultadoTestRepository') protected resultadoTestRepositoryGetter: Getter<ResultadoTestRepository>, @repository.getter('ConsultaTestRepository') protected consultaTestRepositoryGetter: Getter<ConsultaTestRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>,
  ) {
    super(TestPsicometrico, dataSource);
    this.consultas = this.createHasManyThroughRepositoryFactoryFor('consultas', consultaRepositoryGetter, consultaTestRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.resultadoTests = this.createHasManyRepositoryFactoryFor('resultadoTests', resultadoTestRepositoryGetter,);
    this.registerInclusionResolver('resultadoTests', this.resultadoTests.inclusionResolver);
  }
}
