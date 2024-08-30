import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Consulta} from './consulta.model';

@model({
  settings: {
    foreignKeys: {
      fk_consulta_id_nota: {
        name: 'fk_consulta_id_nota',
        entity: 'Consulta',
        entityKey: 'id',
        foreignKey: 'consultaId',
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
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
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

  @belongsTo(() => Consulta, {name: 'consultaNota'})
  consultaId: number;

  constructor(data?: Partial<NotaClinica>) {
    super(data);
  }
}

export interface NotaClinicaRelations {
  // describe navigational properties here
}

export type NotaClinicaWithRelations = NotaClinica & NotaClinicaRelations;
