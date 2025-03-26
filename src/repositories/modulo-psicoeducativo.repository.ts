import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EjercicioPractico, ModuloPsicoeducativo, ModuloPsicoeducativoRelations, Paciente, PacienteModuloPsicoeducativo} from '../models';
import {EjercicioPracticoRepository} from './ejercicio-practico.repository';
import {PacienteModuloPsicoeducativoRepository} from './paciente-modulo-psicoeducativo.repository';
import {PacienteRepository} from './paciente.repository';

export class ModuloPsicoeducativoRepository extends DefaultCrudRepository<
  ModuloPsicoeducativo,
  typeof ModuloPsicoeducativo.prototype.id,
  ModuloPsicoeducativoRelations
> {

  public readonly ejercicioPracticos: HasManyRepositoryFactory<EjercicioPractico, typeof ModuloPsicoeducativo.prototype.id>;

  public readonly modeloPsicoeducativoPacientes: HasManyThroughRepositoryFactory<Paciente, typeof Paciente.prototype.id,
          PacienteModuloPsicoeducativo,
          typeof ModuloPsicoeducativo.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('EjercicioPracticoRepository') protected ejercicioPracticoRepositoryGetter: Getter<EjercicioPracticoRepository>, @repository.getter('PacienteModuloPsicoeducativoRepository') protected pacienteModuloPsicoeducativoRepositoryGetter: Getter<PacienteModuloPsicoeducativoRepository>, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>,
  ) {
    super(ModuloPsicoeducativo, dataSource);
    this.modeloPsicoeducativoPacientes = this.createHasManyThroughRepositoryFactoryFor('modeloPsicoeducativoPacientes', pacienteRepositoryGetter, pacienteModuloPsicoeducativoRepositoryGetter,);
    this.registerInclusionResolver('modeloPsicoeducativoPacientes', this.modeloPsicoeducativoPacientes.inclusionResolver);
    this.ejercicioPracticos = this.createHasManyRepositoryFactoryFor('ejercicioPracticos', ejercicioPracticoRepositoryGetter,);
    this.registerInclusionResolver('ejercicioPracticos', this.ejercicioPracticos.inclusionResolver);
  }
}
