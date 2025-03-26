import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {RespuestaRelevante, RespuestaRelevanteRelations, ResultadoTest} from '../models';
import {ResultadoTestRepository} from './resultado-test.repository';

export class RespuestaRelevanteRepository extends DefaultCrudRepository<
  RespuestaRelevante,
  typeof RespuestaRelevante.prototype.id,
  RespuestaRelevanteRelations
> {

  public readonly resultadoTest: BelongsToAccessor<ResultadoTest, typeof RespuestaRelevante.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ResultadoTestRepository') protected resultadoTestRepositoryGetter: Getter<ResultadoTestRepository>,
  ) {
    super(RespuestaRelevante, dataSource);
    this.resultadoTest = this.createBelongsToAccessorFor('resultadoTest', resultadoTestRepositoryGetter,);
    this.registerInclusionResolver('resultadoTest', this.resultadoTest.inclusionResolver);
  }
}
