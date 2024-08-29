import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Consulta, ConsultaRelations, Terapeuta, Paciente, ResultadoTest} from '../models';
import {TerapeutaRepository} from './terapeuta.repository';
import {PacienteRepository} from './paciente.repository';
import {ResultadoTestRepository} from './resultado-test.repository';

export class ConsultaRepository extends DefaultCrudRepository<
  Consulta,
  typeof Consulta.prototype.id,
  ConsultaRelations
> {

  public readonly terapeutaConsulta: BelongsToAccessor<Terapeuta, typeof Consulta.prototype.id>;

  public readonly pacienteConsulta: BelongsToAccessor<Paciente, typeof Consulta.prototype.id>;

  public readonly resultadosTests: HasManyRepositoryFactory<ResultadoTest, typeof Consulta.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('ResultadoTestRepository') protected resultadoTestRepositoryGetter: Getter<ResultadoTestRepository>,
  ) {
    super(Consulta, dataSource);
    this.resultadosTests = this.createHasManyRepositoryFactoryFor('resultadosTests', resultadoTestRepositoryGetter,);
    this.registerInclusionResolver('resultadosTests', this.resultadosTests.inclusionResolver);
    this.pacienteConsulta = this.createBelongsToAccessorFor('pacienteConsulta', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacienteConsulta', this.pacienteConsulta.inclusionResolver);
    this.terapeutaConsulta = this.createBelongsToAccessorFor('terapeutaConsulta', terapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutaConsulta', this.terapeutaConsulta.inclusionResolver);
  }
}
