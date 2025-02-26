import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EjercicioPractico, ModuloPsicoeducativo, ModuloPsicoeducativoRelations} from '../models';
import {EjercicioPracticoRepository} from './ejercicio-practico.repository';

export class ModuloPsicoeducativoRepository extends DefaultCrudRepository<
  ModuloPsicoeducativo,
  typeof ModuloPsicoeducativo.prototype.id,
  ModuloPsicoeducativoRelations
> {

  public readonly ejercicioPracticos: HasManyRepositoryFactory<EjercicioPractico, typeof ModuloPsicoeducativo.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('EjercicioPracticoRepository') protected ejercicioPracticoRepositoryGetter: Getter<EjercicioPracticoRepository>,
  ) {
    super(ModuloPsicoeducativo, dataSource);
    this.ejercicioPracticos = this.createHasManyRepositoryFactoryFor('ejercicioPracticos', ejercicioPracticoRepositoryGetter,);
    this.registerInclusionResolver('ejercicioPracticos', this.ejercicioPracticos.inclusionResolver);
  }
}
