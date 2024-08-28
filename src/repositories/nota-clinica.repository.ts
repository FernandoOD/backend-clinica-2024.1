import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {NotaClinica, NotaClinicaRelations} from '../models';

export class NotaClinicaRepository extends DefaultCrudRepository<
  NotaClinica,
  typeof NotaClinica.prototype.id,
  NotaClinicaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(NotaClinica, dataSource);
  }
}
