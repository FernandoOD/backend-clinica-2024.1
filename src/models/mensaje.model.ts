import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Paciente} from './paciente.model';
import {Terapeuta} from './terapeuta.model';

@model({
  settings: {
    foreignKeys: {
      fk_paciente_id_mensaje: {
        name: 'fk_paciente_id_mensaje',
        entity: 'Paciente',
        entityKey: 'id',
        foreignKey: 'pacienteId',
      },
      fk_terapeuta_id_mensaje: {
        name: 'fk_terapeuta_id_mensaje',
        entity: 'Terapeuta',
        entityKey: 'id',
        foreignKey: 'terapeutaId',
      },
    },
  },
})
export class Mensaje extends Entity {
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
  Contenido: string;

  @property({
    type: 'date',
    default: 'CURRENT_TIMESTAMP',
  })
  FechaEnvio?: string;

  @belongsTo(() => Paciente, {name: 'pacienteMensaje'})
  pacienteId: number;

  @belongsTo(() => Terapeuta, {name: 'terapeutaMensaje'})
  terapeutaId: number;

  constructor(data?: Partial<Mensaje>) {
    super(data);
  }
}

export interface MensajeRelations {
  // describe navigational properties here
}

export type MensajeWithRelations = Mensaje & MensajeRelations;
