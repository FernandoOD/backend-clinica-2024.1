import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Terapeuta} from './terapeuta.model';
import {Paciente} from './paciente.model';
import {ResultadoTest} from './resultado-test.model';

@model()
export class Consulta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaConsulta?: string;

  @property({
    type: 'string',
  })
  NotasConsulta?: string;

  @belongsTo(() => Terapeuta, {name: 'terapeutaConsulta'})
  terapeutaId: number;

  @belongsTo(() => Paciente, {name: 'pacienteConsulta'})
  pacienteId: number;

  @hasMany(() => ResultadoTest)
  resultadosTests: ResultadoTest[];

  constructor(data?: Partial<Consulta>) {
    super(data);
  }
}

export interface ConsultaRelations {
  // describe navigational properties here
}

export type ConsultaWithRelations = Consulta & ConsultaRelations;
