import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodbds',
  connector: 'mongodb',
  url: '',
  database: 'ClinicaSegDB',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  debug: true,
  connectTimeoutMS: 30000,  // Aumenta el tiempo de espera de conexión a 30 segundos
  socketTimeoutMS: 45000,   // Aumenta el tiempo de espera de socket
  serverSelectionTimeoutMS: 30000, // Espera 30 segundos antes de fallar
  retryWrites: true,
  maxPoolSize: 10,  // 10 segundos
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbdsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodbds';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodbds', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
