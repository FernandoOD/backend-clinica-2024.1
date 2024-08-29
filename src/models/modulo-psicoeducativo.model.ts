import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Terapeuta} from './terapeuta.model';

@model()
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

  constructor(data?: Partial<ModuloPsicoeducativo>) {
    super(data);
  }
}

export interface ModuloPsicoeducativoRelations {
  // describe navigational properties here
}

export type ModuloPsicoeducativoWithRelations = ModuloPsicoeducativo & ModuloPsicoeducativoRelations;
