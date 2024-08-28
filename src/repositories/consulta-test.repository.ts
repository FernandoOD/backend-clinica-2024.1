import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ConsultaTest, ConsultaTestRelations} from '../models';

export class ConsultaTestRepository extends DefaultCrudRepository<
  ConsultaTest,
  typeof ConsultaTest.prototype.id,
  ConsultaTestRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(ConsultaTest, dataSource);
  }
}
