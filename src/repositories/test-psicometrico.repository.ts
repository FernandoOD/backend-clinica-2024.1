import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {TestPsicometrico, TestPsicometricoRelations} from '../models';

export class TestPsicometricoRepository extends DefaultCrudRepository<
  TestPsicometrico,
  typeof TestPsicometrico.prototype.id,
  TestPsicometricoRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(TestPsicometrico, dataSource);
  }
}
