import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Paciente} from './paciente.model';
import {Terapeuta} from './terapeuta.model';

@model({
  settings: {
    foreignKeys: {
      fk_paciente_id_evaluacion: {
        name: 'fk_paciente_id_evaluacion',
        entity: 'Paciente',
        entityKey: 'id',
        foreignKey: 'pacienteId',
      },
      fk_terapeuta_id_evaluacion: {
        name: 'fk_terapeuta_id_evaluacion',
        entity: 'Terapeuta',
        entityKey: 'id',
        foreignKey: 'terapeutaId',
      },
    },
  },
})
export class EvaluacionProgreso extends Entity {
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
  FechaEvaluacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  ProgresoObservado: string;

  @belongsTo(() => Paciente, {name: 'progresoPaciente'})
  pacienteId: number;

  @belongsTo(() => Terapeuta, {name: 'terapeutaProgreso'})
  terapeutaId: number;

  constructor(data?: Partial<EvaluacionProgreso>) {
    super(data);
  }
}

export interface EvaluacionProgresoRelations {
  // describe navigational properties here
}

export type EvaluacionProgresoWithRelations = EvaluacionProgreso & EvaluacionProgresoRelations;
