import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EvaluacionProgreso, EvaluacionProgresoRelations, Paciente, Terapeuta} from '../models';
import {PacienteRepository} from './paciente.repository';
import {TerapeutaRepository} from './terapeuta.repository';

export class EvaluacionProgresoRepository extends DefaultCrudRepository<
  EvaluacionProgreso,
  typeof EvaluacionProgreso.prototype.id,
  EvaluacionProgresoRelations
> {

  public readonly progresoPaciente: BelongsToAccessor<Paciente, typeof EvaluacionProgreso.prototype.id>;

  public readonly terapeutaProgreso: BelongsToAccessor<Terapeuta, typeof EvaluacionProgreso.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('TerapeutaRepository') protected terapeutaRepositoryGetter: Getter<TerapeutaRepository>,
  ) {
    super(EvaluacionProgreso, dataSource);
    this.terapeutaProgreso = this.createBelongsToAccessorFor('terapeutaProgreso', terapeutaRepositoryGetter,);
    this.registerInclusionResolver('terapeutaProgreso', this.terapeutaProgreso.inclusionResolver);
    this.progresoPaciente = this.createBelongsToAccessorFor('progresoPaciente', pacienteRepositoryGetter,);
    this.registerInclusionResolver('progresoPaciente', this.progresoPaciente.inclusionResolver);
  }
}
