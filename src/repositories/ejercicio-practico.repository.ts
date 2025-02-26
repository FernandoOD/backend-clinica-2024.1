import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EjercicioPractico, EjercicioPracticoRelations, ModuloPsicoeducativo, Paciente, PacienteEjercicioPractico} from '../models';
import {ModuloPsicoeducativoRepository} from './modulo-psicoeducativo.repository';
import {PacienteEjercicioPracticoRepository} from './paciente-ejercicio-practico.repository';
import {PacienteRepository} from './paciente.repository';

export class EjercicioPracticoRepository extends DefaultCrudRepository<
  EjercicioPractico,
  typeof EjercicioPractico.prototype.id,
  EjercicioPracticoRelations
> {


  public readonly moduloPsicoeducativo: BelongsToAccessor<ModuloPsicoeducativo, typeof EjercicioPractico.prototype.id>;

  public readonly pacienteEjercicios: HasManyThroughRepositoryFactory<Paciente, typeof Paciente.prototype.id,
          PacienteEjercicioPractico,
          typeof EjercicioPractico.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ModuloPsicoeducativoRepository') protected moduloPsicoeducativoRepositoryGetter: Getter<ModuloPsicoeducativoRepository>, @repository.getter('PacienteEjercicioPracticoRepository') protected pacienteEjercicioPracticoRepositoryGetter: Getter<PacienteEjercicioPracticoRepository>, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>,
  ) {
    super(EjercicioPractico, dataSource);
    this.pacienteEjercicios = this.createHasManyThroughRepositoryFactoryFor('pacienteEjercicios', pacienteRepositoryGetter, pacienteEjercicioPracticoRepositoryGetter,);
    this.registerInclusionResolver('pacienteEjercicios', this.pacienteEjercicios.inclusionResolver);
    this.moduloPsicoeducativo = this.createBelongsToAccessorFor('moduloPsicoeducativo', moduloPsicoeducativoRepositoryGetter,);
    this.registerInclusionResolver('moduloPsicoeducativo', this.moduloPsicoeducativo.inclusionResolver);
  }
}
