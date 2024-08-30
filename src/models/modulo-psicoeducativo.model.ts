import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {EjercicioPractico} from './ejercicio-practico.model';
import {Terapeuta} from './terapeuta.model';

@model({
  settings: {
    foreignKeys: {
      fk_terapeuta_id: {
        name: 'fk_terapeuta_id',
        entity: 'Terapeuta',
        entityKey: 'id',
        foreignKey: 'terapeutaId',
      },
    },
  },
})
export class ModuloPsicoeducativo extends Entity {
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
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaCreacion?: string;

  @belongsTo(() => Terapeuta, {name: 'terapeutaModulo'})
  terapeutaId: number;

  @hasMany(() => EjercicioPractico)
  ejercicioPracticos: EjercicioPractico[];

  constructor(data?: Partial<ModuloPsicoeducativo>) {
    super(data);
  }
}

export interface ModuloPsicoeducativoRelations {
  // describe navigational properties here
}

export type ModuloPsicoeducativoWithRelations = ModuloPsicoeducativo & ModuloPsicoeducativoRelations;
