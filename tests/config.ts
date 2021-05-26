process.env.NODE_ENV = "Test"
process.env.DB_HOST = "mongodb://localhost:27017/vuttr"

import { connect, close } from '../src/config/db/connect';

export const conn = (done: Mocha.Done) => connect()
  .then(() => done())
  .catch(err => done(err))

export const disconnect = (done: Mocha.Done) => close()
  .then(() => done())
  .catch(err => done(err))