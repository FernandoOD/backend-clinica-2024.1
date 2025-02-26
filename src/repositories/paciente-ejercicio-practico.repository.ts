import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {PacienteEjercicioPractico, PacienteEjercicioPracticoRelations} from '../models';

export class PacienteEjercicioPracticoRepository extends DefaultCrudRepository<
  PacienteEjercicioPractico,
  typeof PacienteEjercicioPractico.prototype.id,
  PacienteEjercicioPracticoRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(PacienteEjercicioPractico, dataSource);
  }
}
