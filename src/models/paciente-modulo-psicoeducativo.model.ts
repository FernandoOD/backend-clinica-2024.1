import {Entity, model, property} from '@loopback/repository';

@model()
export class PacienteModuloPsicoeducativo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  pacienteId?: number;

  @property({
    type: 'number',
  })
  moduloPsicoeducativoId?: number;

  @property({
    type: 'boolean',
    default: false,
  })
  contestado: boolean;

  constructor(data?: Partial<PacienteModuloPsicoeducativo>) {
    super(data);
  }
}

export interface PacienteModuloPsicoeducativoRelations {
  // describe navigational properties here
}

export type PacienteModuloPsicoeducativoWithRelations = PacienteModuloPsicoeducativo & PacienteModuloPsicoeducativoRelations;
