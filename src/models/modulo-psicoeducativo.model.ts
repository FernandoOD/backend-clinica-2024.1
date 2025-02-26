import {Entity, hasMany, model, property} from '@loopback/repository';
import {EjercicioPractico} from './ejercicio-practico.model';

@model({
  settings: {
    foreignKeys: {
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
    type: 'string',
    jsonSchema: {
      format: 'date', // Restringe el formato a solo fecha 'YYYY-MM-DD'
    },
  })
  FechaCreacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  UrlVideo: string;


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
