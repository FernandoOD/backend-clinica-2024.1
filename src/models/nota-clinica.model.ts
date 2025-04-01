import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Paciente} from './paciente.model';

@model({
  settings: {
    foreignKeys: {
      fk_consulta_id_nota: {
        name: 'fk_paciente_id_nota',
        entity: 'Paciente',
        entityKey: 'id',
        foreignKey: 'pacienteId',
      },
    },
  },
})
export class NotaClinica extends Entity {
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
  FechaCreacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  Contenido: string;

  @property({
    type: 'string',
    required: true,
  })
  PlanTratamiento: string;

  @property({
    type: 'string',
    required: true,
  })
  Objetivos: string;

  @property({
    type: 'string',
    required: true,
  })
  Conceptualizacion: string;

  @belongsTo(() => Paciente, {name: 'pacienteNota'})
  pacienteId: number;

  constructor(data?: Partial<NotaClinica>) {
    super(data);
  }
}

export interface NotaClinicaRelations {
  // describe navigational properties here
}

export type NotaClinicaWithRelations = NotaClinica & NotaClinicaRelations;
