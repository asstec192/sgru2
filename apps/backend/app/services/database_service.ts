import * as tedious from 'tedious'
import * as tarn from 'tarn'
import { Kysely, MssqlDialect } from 'kysely'
import { DB } from '../../types/db.types.js'

const dialect = new MssqlDialect({
  tarn: {
    ...tarn,
    options: {
      min: 0,
      max: 10,
    },
  },
  tedious: {
    ...tedious,
    connectionFactory: () =>
      new tedious.Connection({
        authentication: {
          options: {
            password: 'password',
            userName: 'username',
          },
          type: 'default',
        },
        options: {
          database: 'some_db',
          port: 1433,
          trustServerCertificate: true,
        },
        server: 'localhost',
      }),
  },
})

export const db = new Kysely<DB>({
  dialect,
})
