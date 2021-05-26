import { expect, use } from 'chai';
import request from 'supertest';
import http from 'chai-http';
import app from '../../src/index';
import { conn, disconnect } from '../config';
import {
  toolMock,
  toolsMock
} from '../mocks/tools.mock';
import { Types } from 'mongoose';

use(http);

describe('Intergration Tests', () => {
  before(done => {
    conn(done)
    Promise.all(toolsMock.map(tools => request(app)
      .post('/tools')
      .send(tools)
    ))
  })

  after(done => {
    disconnect(done)
  })

  const get = request(app).get('/tools');

  const mockId = '60a2fb1c53cce44dcc18811d';
  const mockId2 = '609fdf53e739490f78892f45';

  describe('POST /tools', () => {
    it('Success POST', (done) => {
      request(app)
        .post('/tools')
        .send({
          ...toolMock,
          _id: Types.ObjectId(mockId)
        }).then((res) => {
          const { body } = res;
          expect(body).to.be.an('object')
          expect(body).to.have.property('_id')
          expect(body).to.have.property('title')
          expect(body).to.have.property('link')
          expect(body).to.have.property('description')
          expect(body).to.have.property('tags');
          done()
        }).catch(err => done(err));
    })

    it('StatusCode 201 CREATED and not error', (done) => {
      request(app)
        .post('/tools')
        .send({
          ...toolMock,
          _id: Types.ObjectId(mockId2)
        }).then((res) => {
          expect(res).to.have.status(201);
          done()
        }).catch(err => {
          expect(err).to.be.null;
          done(err)
        });
    })
  })

  describe('GET /tools', () => {

    it('Success List tools length equals 4', (done) => {
      get.then((res) => {
        const { body } = res;
        expect(body.length).to.equal(4);
        done()
      }).catch(err => done(err));
    })

    it('StatusCode 200 OK and not error', (done) => {
      get.then((res) => {
        expect(res).to.have.status(200);
        done()
      }).catch(err => {
        expect(err).to.be.null;
        done(err)
      });
    })
  })

  describe('DELETE /tools', () => {
    it('Success Delete (4 left 3)', (done) => {
      request(app)
        .delete(`/tools/${mockId}`)
        .then(_ => {
          request(app).get('/tools')
            .then(result => {
              expect(result.body.length).to.equal(3);
              done()
            }).catch(err => done(err));
        }).catch(err => done(err));
    })

    it('StatusCode 204 NO CONTENT', (done) => {
      request(app)
        .delete(`/tools/${mockId2}`)
        .then(res => {
          expect(res).to.have.status(204);
          done()
        }).catch(error => done(error));
    })
  })
})