import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EjercicioPractico, EjercicioPracticoRelations} from '../models';

export class EjercicioPracticoRepository extends DefaultCrudRepository<
  EjercicioPractico,
  typeof EjercicioPractico.prototype.id,
  EjercicioPracticoRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(EjercicioPractico, dataSource);
  }
}
