import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
import { teamsMock } from './mocks/teamsMock';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/teams', () => {
  let chaiHttpResponse: Response;

  describe('OK', () => {
    test('Return OK', async () => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
    }); 
  });
});

describe('/teams/:id', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    (Team.findByPk as sinon.SinonStub).restore();
  });


  describe('GET', () => {
    test('RETURN BY ID', async () => {
      sinon.stub(Team, 'findByPk').resolves(teamsMock[0] as Team);

      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock[0]);
    }); 

    test('NOT EXISTS', async () => {
      sinon.stub(Team, 'findByPk').resolves(undefined);

      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'There is no team with such id!',
      });
    }); 
  });
});
