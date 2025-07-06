import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbdsDataSource} from '../datasources';
import {Rol, Usuario, UsuarioRelations} from '../models';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbdsDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);

    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
