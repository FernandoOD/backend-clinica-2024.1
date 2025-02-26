import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {EntradaHistoria} from './entrada-historia.model';
import {Paciente} from './paciente.model';

@model({
  settings: {
    foreignKeys: {
      fk_paciente_id_historia: {
        name: 'fk_paciente_id_historia',
        entity: 'Paciente',
        entityKey: 'id',
        foreignKey: 'pacienteId',
      },
    },
  },
})
export class HistoriaClinica extends Entity {
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
  Descripcion: string;

  @hasMany(() => EntradaHistoria)
  entradaHistorias: EntradaHistoria[];

  @belongsTo(() => Paciente, {name: 'pacienteHistoria'})
  pacienteId: number;

  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;
