import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';

export class MysqldsDataSource extends juggler.DataSource {
  static dataSourceName = 'mysqlds';

  constructor(
    @inject('datasources.config.mysqlds', {optional: true})
    dsConfig: object = {
      name: 'mysqlds',
      connector: 'mysql',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
  ) {
    super(dsConfig);
  }
}
