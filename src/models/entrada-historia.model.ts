import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Consulta} from './consulta.model';
import {HistoriaClinica} from './historia-clinica.model';

@model({
  settings: {
    foreignKeys: {
      fk_historia_clinica_id_entrada: {
        name: 'fk_historia_clinica_id_entrada',
        entity: 'HistoriaClinica',
        entityKey: 'id',
        foreignKey: 'historiaClinicaId',
      },
      fk_consulta_id_entrada: {
        name: 'fk_consulta_id_entrada',
        entity: 'Consulta',
        entityKey: 'id',
        foreignKey: 'consultaId',
      },
    },
  },
})
export class EntradaHistoria extends Entity {
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
  FechaEntrada?: string;

  @property({
    type: 'string',
    required: true,
  })
  Detalles: string;

  @belongsTo(() => Consulta)
  consultaId: number;

  @belongsTo(() => HistoriaClinica)
  historiaClinicaId: number;

  constructor(data?: Partial<EntradaHistoria>) {
    super(data);
  }
}

export interface EntradaHistoriaRelations {
  // describe navigational properties here
}

export type EntradaHistoriaWithRelations = EntradaHistoria & EntradaHistoriaRelations;
