import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ModuloPsicoeducativo, ModuloPsicoeducativoRelations} from '../models';

export class ModuloPsicoeducativoRepository extends DefaultCrudRepository<
  ModuloPsicoeducativo,
  typeof ModuloPsicoeducativo.prototype.id,
  ModuloPsicoeducativoRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(ModuloPsicoeducativo, dataSource);
  }
}
