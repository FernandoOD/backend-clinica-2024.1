import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<ModuloPsicoeducativo>) {
    super(data);
  }
}

export interface ModuloPsicoeducativoRelations {
  // describe navigational properties here
}

export type ModuloPsicoeducativoWithRelations = ModuloPsicoeducativo & ModuloPsicoeducativoRelations;
