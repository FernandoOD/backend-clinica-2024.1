import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EntradaHistoria, EntradaHistoriaRelations} from '../models';

export class EntradaHistoriaRepository extends DefaultCrudRepository<
  EntradaHistoria,
  typeof EntradaHistoria.prototype.id,
  EntradaHistoriaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(EntradaHistoria, dataSource);
  }
}
