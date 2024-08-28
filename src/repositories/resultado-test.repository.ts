import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ResultadoTest, ResultadoTestRelations} from '../models';

export class ResultadoTestRepository extends DefaultCrudRepository<
  ResultadoTest,
  typeof ResultadoTest.prototype.id,
  ResultadoTestRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(ResultadoTest, dataSource);
  }
}
