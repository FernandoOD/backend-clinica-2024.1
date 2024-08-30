import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_consulta_id_test: {
        name: 'fk_consulta_id_test',
        entity: 'Consulta',
        entityKey: 'id',
        foreignKey: 'consultaId',
      },
      fk_test_id_psicometrico: {
        name: 'fk_test_id_psicometrico',
        entity: 'TestPsicometrico',
        entityKey: 'id',
        foreignKey: 'testPsicometricoId',
      },
    },
  },
})
export class ConsultaTest extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  consultaId?: number;

  @property({
    type: 'number',
  })
  testPsicometricoId?: number;

  constructor(data?: Partial<ConsultaTest>) {
    super(data);
  }
}

export interface ConsultaTestRelations {
  // describe navigational properties here
}

export type ConsultaTestWithRelations = ConsultaTest & ConsultaTestRelations;
