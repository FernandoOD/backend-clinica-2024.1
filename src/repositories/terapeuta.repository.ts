import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Terapeuta, TerapeutaRelations} from '../models';

export class TerapeutaRepository extends DefaultCrudRepository<
  Terapeuta,
  typeof Terapeuta.prototype.id,
  TerapeutaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Terapeuta, dataSource);
  }
}
