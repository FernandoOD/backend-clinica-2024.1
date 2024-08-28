import {Entity, model, property} from '@loopback/repository';

@model()
export class Paciente extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoPaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoMaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
  })
  Telefono?: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaRegistro?: string;


  constructor(data?: Partial<Paciente>) {
    super(data);
  }
}

export interface PacienteRelations {
  // describe navigational properties here
}

export type PacienteWithRelations = Paciente & PacienteRelations;
