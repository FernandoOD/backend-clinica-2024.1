import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Terapeuta, TerapeutaRelations, ModuloPsicoeducativo, Consulta, Mensaje, EvaluacionProgreso} from '../models';
import {ModuloPsicoeducativoRepository} from './modulo-psicoeducativo.repository';
import {ConsultaRepository} from './consulta.repository';
import {MensajeRepository} from './mensaje.repository';
import {EvaluacionProgresoRepository} from './evaluacion-progreso.repository';

export class TerapeutaRepository extends DefaultCrudRepository<
  Terapeuta,
  typeof Terapeuta.prototype.id,
  TerapeutaRelations
> {

  public readonly modulosPsicoeducativos: HasManyRepositoryFactory<ModuloPsicoeducativo, typeof Terapeuta.prototype.id>;

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Terapeuta.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensaje, typeof Terapeuta.prototype.id>;

  public readonly evaluacionProgresos: HasManyRepositoryFactory<EvaluacionProgreso, typeof Terapeuta.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ModuloPsicoeducativoRepository') protected moduloPsicoeducativoRepositoryGetter: Getter<ModuloPsicoeducativoRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>, @repository.getter('EvaluacionProgresoRepository') protected evaluacionProgresoRepositoryGetter: Getter<EvaluacionProgresoRepository>,
  ) {
    super(Terapeuta, dataSource);
    this.evaluacionProgresos = this.createHasManyRepositoryFactoryFor('evaluacionProgresos', evaluacionProgresoRepositoryGetter,);
    this.registerInclusionResolver('evaluacionProgresos', this.evaluacionProgresos.inclusionResolver);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.modulosPsicoeducativos = this.createHasManyRepositoryFactoryFor('modulosPsicoeducativos', moduloPsicoeducativoRepositoryGetter,);
    this.registerInclusionResolver('modulosPsicoeducativos', this.modulosPsicoeducativos.inclusionResolver);
  }
}
