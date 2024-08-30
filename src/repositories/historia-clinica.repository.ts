import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {HistoriaClinica, HistoriaClinicaRelations, EntradaHistoria, Paciente} from '../models';
import {EntradaHistoriaRepository} from './entrada-historia.repository';
import {PacienteRepository} from './paciente.repository';

export class HistoriaClinicaRepository extends DefaultCrudRepository<
  HistoriaClinica,
  typeof HistoriaClinica.prototype.id,
  HistoriaClinicaRelations
> {

  public readonly entradaHistorias: HasManyRepositoryFactory<EntradaHistoria, typeof HistoriaClinica.prototype.id>;

  public readonly pacienteHistoria: BelongsToAccessor<Paciente, typeof HistoriaClinica.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('EntradaHistoriaRepository') protected entradaHistoriaRepositoryGetter: Getter<EntradaHistoriaRepository>, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>,
  ) {
    super(HistoriaClinica, dataSource);
    this.pacienteHistoria = this.createBelongsToAccessorFor('pacienteHistoria', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacienteHistoria', this.pacienteHistoria.inclusionResolver);
    this.entradaHistorias = this.createHasManyRepositoryFactoryFor('entradaHistorias', entradaHistoriaRepositoryGetter,);
    this.registerInclusionResolver('entradaHistorias', this.entradaHistorias.inclusionResolver);
  }
}
