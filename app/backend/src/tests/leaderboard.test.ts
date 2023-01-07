import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/leaderboard', () => {
  let chaiHttpResponse: Response;

  describe('GET', () => {
    it('RETURN OK', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    }); 
  });

  describe('/leaderboard/home', () => {
    it('RETURN HOME', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    }); 
  });

  describe('/leaderboard/away', () => {
    it('RETURN AWAY', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    }); 
  });
});
