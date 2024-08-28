import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {PacienteTerapeuta, PacienteTerapeutaRelations} from '../models';

export class PacienteTerapeutaRepository extends DefaultCrudRepository<
  PacienteTerapeuta,
  typeof PacienteTerapeuta.prototype.id,
  PacienteTerapeutaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(PacienteTerapeuta, dataSource);
  }
}
