import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EjercicioPractico, EjercicioPracticoRelations, Paciente, ModuloPsicoeducativo} from '../models';
import {PacienteRepository} from './paciente.repository';
import {ModuloPsicoeducativoRepository} from './modulo-psicoeducativo.repository';

export class EjercicioPracticoRepository extends DefaultCrudRepository<
  EjercicioPractico,
  typeof EjercicioPractico.prototype.id,
  EjercicioPracticoRelations
> {

  public readonly pacienteEjercicio: BelongsToAccessor<Paciente, typeof EjercicioPractico.prototype.id>;

  public readonly moduloPsicoeducativo: BelongsToAccessor<ModuloPsicoeducativo, typeof EjercicioPractico.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('ModuloPsicoeducativoRepository') protected moduloPsicoeducativoRepositoryGetter: Getter<ModuloPsicoeducativoRepository>,
  ) {
    super(EjercicioPractico, dataSource);
    this.moduloPsicoeducativo = this.createBelongsToAccessorFor('moduloPsicoeducativo', moduloPsicoeducativoRepositoryGetter,);
    this.registerInclusionResolver('moduloPsicoeducativo', this.moduloPsicoeducativo.inclusionResolver);
    this.pacienteEjercicio = this.createBelongsToAccessorFor('pacienteEjercicio', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacienteEjercicio', this.pacienteEjercicio.inclusionResolver);
  }
}
