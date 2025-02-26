import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {ModuloPsicoeducativo} from './modulo-psicoeducativo.model';
import {Paciente} from './paciente.model';
import {PacienteEjercicioPractico} from './paciente-ejercicio-practico.model';

@model({
  settings: {
    foreignKeys: {
      fk_modulo_psicoeducativo_id: {
        name: 'fk_modulo_psicoeducativo_id',
        entity: 'ModuloPsicoeducativo',
        entityKey: 'id',
        foreignKey: 'moduloPsicoeducativoId',
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
  Titulo: string;

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
    type: 'string',
    jsonSchema: {
      format: 'date', // Restringe el formato a solo fecha 'YYYY-MM-DD'
    },
  })
  FechaCreacion?: string;

  @belongsTo(() => ModuloPsicoeducativo)
  moduloPsicoeducativoId: number;

  @hasMany(() => Paciente, {through: {model: () => PacienteEjercicioPractico}})
  pacienteEjercicios: Paciente[];

  constructor(data?: Partial<EjercicioPractico>) {
    super(data);
  }
}

export interface EjercicioPracticoRelations {
  // describe navigational properties here
}

export type EjercicioPracticoWithRelations = EjercicioPractico & EjercicioPracticoRelations;
