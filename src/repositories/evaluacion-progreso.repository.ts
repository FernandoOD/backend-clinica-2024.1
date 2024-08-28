import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EvaluacionProgreso, EvaluacionProgresoRelations} from '../models';

export class EvaluacionProgresoRepository extends DefaultCrudRepository<
  EvaluacionProgreso,
  typeof EvaluacionProgreso.prototype.id,
  EvaluacionProgresoRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(EvaluacionProgreso, dataSource);
  }
}
