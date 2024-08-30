import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {ConsultaTest} from './consulta-test.model';
import {EntradaHistoria} from './entrada-historia.model';
import {NotaClinica} from './nota-clinica.model';
import {Paciente} from './paciente.model';
import {ResultadoTest} from './resultado-test.model';
import {Terapeuta} from './terapeuta.model';
import {TestPsicometrico} from './test-psicometrico.model';

@model({
  settings: {
    foreignKeys: {
      fk_paciente_id_consulta: {
        name: 'fk_paciente_id_consulta',
        entity: 'Paciente',
        entityKey: 'id',
        foreignKey: 'pacienteId',
      },
      fk_terapeuta_id_consulta: {
        name: 'fk_terapeuta_id_consulta',
        entity: 'Terapeuta',
        entityKey: 'id',
        foreignKey: 'terapeutaId',
      },
    },
  },
})
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

  @hasMany(() => EntradaHistoria)
  entradaHistorias: EntradaHistoria[];

  @hasOne(() => NotaClinica)
  notaClinica: NotaClinica;

  @hasMany(() => TestPsicometrico, {through: {model: () => ConsultaTest}})
  testPsicometricos: TestPsicometrico[];

  constructor(data?: Partial<Consulta>) {
    super(data);
  }
}

export interface ConsultaRelations {
  // describe navigational properties here
}

export type ConsultaWithRelations = Consulta & ConsultaRelations;
