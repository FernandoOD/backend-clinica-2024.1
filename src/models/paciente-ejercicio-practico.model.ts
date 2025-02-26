import {Entity, model, property} from '@loopback/repository';

@model()
export class PacienteEjercicioPractico extends Entity {
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
  ejercicioPracticoId?: number;

  constructor(data?: Partial<PacienteEjercicioPractico>) {
    super(data);
  }
}

export interface PacienteEjercicioPracticoRelations {
  // describe navigational properties here
}

export type PacienteEjercicioPracticoWithRelations = PacienteEjercicioPractico & PacienteEjercicioPracticoRelations;
