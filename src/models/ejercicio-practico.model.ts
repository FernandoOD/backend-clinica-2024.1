import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ModuloPsicoeducativo} from './modulo-psicoeducativo.model';
import {Paciente} from './paciente.model';

@model({
  settings: {
    foreignKeys: {
      fk_modulo_psicoeducativo_id: {
        name: 'fk_modulo_psicoeducativo_id',
        entity: 'ModuloPsicoeducativo',
        entityKey: 'id',
        foreignKey: 'moduloPsicoeducativoId',
      },
      fk_paciente_id: {
        name: 'fk_paciente_id',
        entity: 'Paciente',
        entityKey: 'id',
        foreignKey: 'pacienteId',
      },
    },
  },
})
export class EjercicioPractico extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  Instrucciones: string;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaCreacion?: string;

  @belongsTo(() => Paciente, {name: 'pacienteEjercicio'})
  pacienteId: number;

  @belongsTo(() => ModuloPsicoeducativo)
  moduloPsicoeducativoId: number;

  constructor(data?: Partial<EjercicioPractico>) {
    super(data);
  }
}

export interface EjercicioPracticoRelations {
  // describe navigational properties here
}

export type EjercicioPracticoWithRelations = EjercicioPractico & EjercicioPracticoRelations;
