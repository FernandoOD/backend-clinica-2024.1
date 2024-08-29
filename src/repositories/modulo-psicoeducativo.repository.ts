import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ModuloPsicoeducativo, ModuloPsicoeducativoRelations, Terapeuta} from '../models';
import {TerapeutaRepository} from './terapeuta.repository';

export class ModuloPsicoeducativoRepository extends DefaultCrudRepository<
  ModuloPsicoeducativo,
  typeof ModuloPsicoeducativo.prototype.id,
  ModuloPsicoeducativoRelations
> {

  public readonly terapeutaModulo: BelongsToAccessor<Terapeuta, typeof ModuloPsicoeducativo.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>,
  ) {
    super(ModuloPsicoeducativo, dataSource);
    this.terapeutaModulo = this.createBelongsToAccessorFor('terapeutaModulo', terapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutaModulo', this.terapeutaModulo.inclusionResolver);
  }
}
