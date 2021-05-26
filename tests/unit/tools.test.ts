import { expect } from 'chai';
import request from 'supertest';
import { schemaPostToolsRequest } from '../../src/controllers/toolsController';

import app from '../../src/index';
import validatePayload from '../../src/utils/ValidatePayload';
import { conn, disconnect } from '../config';
import { toolMock } from '../mocks/tools.mock';

describe('Unit Tests', () => {
  // before(done => {
  //   conn(done)
  // })

  // after(done => {
  //   disconnect(done)
  // })

  describe('Validate object "IPostToolsRequest"', () => {
    it('title to be a "string"', (done) => {
      const title = toolMock.title;
      expect(title).to.be.a('string');
      done()
    })

    it('title is a "required"', (done) => {
      const title = toolMock.title;
      expect(title).to.exist;
      done()
    })

    it('link to be a "string"', (done) => {
      const link = toolMock.link;
      expect(link).to.be.a('string');
      done()
    })

    it('link is a "required"', (done) => {
      const link = toolMock.link;
      expect(link).to.exist;
      done()
    })

    it('description to be a "string"', (done) => {
      const description = toolMock.description;
      expect(description).to.be.a('string');
      done()
    })

    it('tags to be a "array" and length equals 5', (done) => {
      const tags = toolMock.tags;
      expect(tags).to.be.an('array').to.have.lengthOf(5);
      done()
    })
  })

  describe('validatePayload schemaPostToolsRequest', () => {
    it('Valid payload', (done) => {
      const validate = validatePayload(toolMock, schemaPostToolsRequest)
      expect(validate).to.be.an('null')
      done()
    })

    it('"title" must be a string', (done) => {
      const validate = validatePayload({
        ...toolMock,
        title: 123
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"title" must be a string')
      done()
    })

    it('"title" is not allowed to be empty', (done) => {
      const validate = validatePayload({
        ...toolMock,
        title: ""
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"title" is not allowed to be empty')
      done()
    })

    it('"title" is required', (done) => {
      const newMock = { ...toolMock };
      delete newMock.title
      const validate = validatePayload(newMock, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"title" is required')
      done()
    })

    it('"link" must be a string', (done) => {
      const validate = validatePayload({
        ...toolMock,
        link: 123
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"link" must be a string')
      done()
    })

    it('"link" is not allowed to be empty', (done) => {
      const validate = validatePayload({
        ...toolMock,
        link: ""
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"link" is not allowed to be empty')
      done()
    })

    it('"link" must be a valid uri', (done) => {
      const validate = validatePayload({
        ...toolMock,
        link: "abcdef"
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"link" must be a valid uri')
      done()
    })

    it('"link" is required', (done) => {
      const newMock = { ...toolMock };;
      delete newMock.link;
      const validate = validatePayload(newMock, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"link" is required')
      done()
    })

    it('"description" must be a string', (done) => {
      const validate = validatePayload({
        ...toolMock,
        description: 123
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"description" must be a string')
      done()
    })

    it('"tags" must be an array', (done) => {
      const validate = validatePayload({
        ...toolMock,
        tags: 123
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"tags" must be an array')
      done()
    })

    it('"tags" is required', (done) => {
      const newMock = { ...toolMock };;
      delete newMock.tags;
      const validate = validatePayload(newMock, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"tags" is required')
      done()
    })

    it('"tags" is item must be a string', (done) => {
      const validate = validatePayload({
        ...toolMock,
        tags: [123, 456]
      }, schemaPostToolsRequest)
      expect(validate.details[0].message).to.be.equal('"0" must be a string')
      done()
    })
  })
})