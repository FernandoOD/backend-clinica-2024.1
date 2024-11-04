import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_paciente_id_terapeuta: {
        name: 'fk_paciente_id_terapeuta',
        entity: 'Paciente',
        entityKey: 'id',
        foreignKey: 'pacienteId',
      },
      fk_terapeuta_id_paciente: {
        name: 'fk_terapeuta_id_paciente',
        entity: 'Terapeuta',
        entityKey: 'id',
        foreignKey: 'terapeutaId',
      },
    },
  },
})
export class PacienteTerapeuta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    jsonSchema: {
      format: 'date', // Restringe el formato a solo fecha 'YYYY-MM-DD'
    },
  })
  FechaInicio?: string;

  @property({
    type: 'string',
    jsonSchema: {
      format: 'date', // Restringe el formato a solo fecha 'YYYY-MM-DD'
    },
  })
  FechaFin?: string;

  @property({
    type: 'number',
  })
  pacienteId?: number;

  @property({
    type: 'number',
  })
  terapeutaId?: number;

  constructor(data?: Partial<PacienteTerapeuta>) {
    super(data);
  }
}

export interface PacienteTerapeutaRelations {
  // describe navigational properties here
}

export type PacienteTerapeutaWithRelations = PacienteTerapeuta & PacienteTerapeutaRelations;
