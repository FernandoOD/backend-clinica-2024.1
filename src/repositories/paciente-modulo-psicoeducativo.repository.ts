import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {PacienteModuloPsicoeducativo, PacienteModuloPsicoeducativoRelations} from '../models';

export class PacienteModuloPsicoeducativoRepository extends DefaultCrudRepository<
  PacienteModuloPsicoeducativo,
  typeof PacienteModuloPsicoeducativo.prototype.id,
  PacienteModuloPsicoeducativoRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(PacienteModuloPsicoeducativo, dataSource);
  }
}
