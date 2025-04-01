import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Consulta, ConsultaRelations, ConsultaTest, EntradaHistoria, Paciente, ResultadoTest, Terapeuta, TestPsicometrico} from '../models';
import {ConsultaTestRepository} from './consulta-test.repository';
import {EntradaHistoriaRepository} from './entrada-historia.repository';
import {PacienteRepository} from './paciente.repository';
import {ResultadoTestRepository} from './resultado-test.repository';
import {TerapeutaRepository} from './terapeuta.repository';
import {TestPsicometricoRepository} from './test-psicometrico.repository';

export class ConsultaRepository extends DefaultCrudRepository<
  Consulta,
  typeof Consulta.prototype.id,
  ConsultaRelations
> {

  public readonly terapeutaConsulta: BelongsToAccessor<Terapeuta, typeof Consulta.prototype.id>;

  public readonly pacienteConsulta: BelongsToAccessor<Paciente, typeof Consulta.prototype.id>;

  public readonly resultadosTests: HasManyRepositoryFactory<ResultadoTest, typeof Consulta.prototype.id>;

  public readonly entradaHistorias: HasManyRepositoryFactory<EntradaHistoria, typeof Consulta.prototype.id>;


  public readonly testPsicometricos: HasManyThroughRepositoryFactory<TestPsicometrico, typeof TestPsicometrico.prototype.id,
    ConsultaTest,
    typeof Consulta.prototype.id
  >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('ResultadoTestRepository') protected resultadoTestRepositoryGetter: Getter<ResultadoTestRepository>, @repository.getter('EntradaHistoriaRepository') protected entradaHistoriaRepositoryGetter: Getter<EntradaHistoriaRepository>, @repository.getter('ConsultaTestRepository') protected consultaTestRepositoryGetter: Getter<ConsultaTestRepository>, @repository.getter('TestPsicometricoRepository') protected testPsicometricoRepositoryGetter: Getter<TestPsicometricoRepository>,
  ) {
    super(Consulta, dataSource);
    this.testPsicometricos = this.createHasManyThroughRepositoryFactoryFor('testPsicometricos', testPsicometricoRepositoryGetter, consultaTestRepositoryGetter,);
    this.registerInclusionResolver('testPsicometricos', this.testPsicometricos.inclusionResolver);
    this.entradaHistorias = this.createHasManyRepositoryFactoryFor('entradaHistorias', entradaHistoriaRepositoryGetter,);
    this.registerInclusionResolver('entradaHistorias', this.entradaHistorias.inclusionResolver);
    this.resultadosTests = this.createHasManyRepositoryFactoryFor('resultadosTests', resultadoTestRepositoryGetter,);
    this.registerInclusionResolver('resultadosTests', this.resultadosTests.inclusionResolver);
    this.pacienteConsulta = this.createBelongsToAccessorFor('pacienteConsulta', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacienteConsulta', this.pacienteConsulta.inclusionResolver);
    this.terapeutaConsulta = this.createBelongsToAccessorFor('terapeutaConsulta', terapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutaConsulta', this.terapeutaConsulta.inclusionResolver);
  }
}
