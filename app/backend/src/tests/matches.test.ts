// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';
// import { Response } from 'superagent';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import App from '../app';
// import { StatusCodes } from 'http-status-codes';
// import Match from '../database/models/Match';
// import { matchesMock, newMatchMock, newMatchResponseMock } from './mocks/matchesMock';

// chai.use(chaiHttp);

// const { app } = new App();

// const { expect } = chai;

// describe('/matches', () => {
//   let chaiHttpResponse: Response;

//   describe('GET', () => {
//     afterEach(() => {
//       (Match.findAll as sinon.SinonStub).restore();
//     });

//     test('RETURN OK', async () => {
//       sinon.stub(Match, 'findAll').resolves(matchesMock as unknown[] as Match[]);

//       chaiHttpResponse = await chai.request(app).get('/matches');

//       expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
//       expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
//     }); 

//     test('RETURN IN PROGRESS', async () => {
//       sinon.stub(Match, 'findAll').resolves([matchesMock[1]] as unknown[] as Match[]);

//       chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

//       expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
//       expect(chaiHttpResponse.body).to.deep.equal([matchesMock[1]]);
//     });
    
//     test('RETURN NOT PROGRESS', async () => {
//       sinon.stub(Match, 'findAll').resolves([matchesMock[0]] as unknown[] as Match[]);

//       chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

//       expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
//       expect(chaiHttpResponse.body).to.deep.equal([matchesMock[0]]);
//     }); 
//   });

//   describe('POST', () => {
//     describe('OK', () => {
//       test('CREATE', async () => {
//         sinon.stub(jwt, 'verify').resolves({ id: 1 });
//         sinon.stub(Match, 'create').resolves(newMatchResponseMock as Match);

//         chaiHttpResponse = await chai.request(app)
//           .post('/matches')
//           .send(newMatchMock)
//           .set('Authorization', 'something');
  
//         expect(chaiHttpResponse.status).to.be.equal(StatusCodes.CREATED);
//         expect(chaiHttpResponse.body).to.deep.equal(newMatchResponseMock);

//         (jwt.verify as sinon.SinonStub).restore();
//       }); 
//     });
    
//     describe('FAIL', () => {
//       describe('POST', () => {
//         beforeEach(() => {

//         })


//         test('CREATE', async () => {
//           sinon.stub(jwt, 'verify').resolves({ id: 1 });
//           sinon.stub(Match, 'create').resolves(newMatchResponseMock as Match);
  
//           chaiHttpResponse = await chai.request(app)
//             .post('/matches')
//             .send(newMatchMock)
//             .set('Authorization', 'something');
    
//           expect(chaiHttpResponse.status).to.be.equal(StatusCodes.CREATED);
//           expect(chaiHttpResponse.body).to.deep.equal(newMatchResponseMock);
  
//           (jwt.verify as sinon.SinonStub).restore();
//         }); 
//       });

//   });

// });
