import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ModuloPsicoeducativo, ModuloPsicoeducativoRelations, Terapeuta, EjercicioPractico} from '../models';
import {TerapeutaRepository} from './terapeuta.repository';
import {EjercicioPracticoRepository} from './ejercicio-practico.repository';

export class ModuloPsicoeducativoRepository extends DefaultCrudRepository<
  ModuloPsicoeducativo,
  typeof ModuloPsicoeducativo.prototype.id,
  ModuloPsicoeducativoRelations
> {

  public readonly terapeutaModulo: BelongsToAccessor<Terapeuta, typeof ModuloPsicoeducativo.prototype.id>;

  public readonly ejercicioPracticos: HasManyRepositoryFactory<EjercicioPractico, typeof ModuloPsicoeducativo.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>, @repository.getter('EjercicioPracticoRepository') protected ejercicioPracticoRepositoryGetter: Getter<EjercicioPracticoRepository>,
  ) {
    super(ModuloPsicoeducativo, dataSource);
    this.ejercicioPracticos = this.createHasManyRepositoryFactoryFor('ejercicioPracticos', ejercicioPracticoRepositoryGetter,);
    this.registerInclusionResolver('ejercicioPracticos', this.ejercicioPracticos.inclusionResolver);
    this.terapeutaModulo = this.createBelongsToAccessorFor('terapeutaModulo', terapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutaModulo', this.terapeutaModulo.inclusionResolver);
  }
}
