const request = require('supertest');
const app = require('../src/index');

describe('Endpoints', () => {
  // beforeAll(done => {
  //   process.env.NODE_ENV = 'test';
  // });
  let userToken = '';
  let refreshToken = '';
  let email = `adham.goussous+${new Date().getTime()}@gmail.com`;

  it('register', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email,
        password: '123123',
      });
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
    userToken = res.body.token.accessToken;
    refreshToken = res.body.token.refreshToken;
    expect(res.statusCode).toEqual(201);
  });
  it('register again', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email,
        password: '123123',
      });
    expect(res.statusCode).toEqual(409);
  });
  it('get current user', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
  });
  it('refresh ', async () => {
    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        email,
        refreshToken,
      });
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post');
  });
  it('list users without admin access', async () => {
    const res = await request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(403);
  });
  it('create contact without user', async () => {
    const res = await request(app)
      .post('/api/v1/contacts')
      .send({
        firstName: 'First Name',
        lastName: 'Last Name',
        phoneNumber: '+962XXXXXXXXX',
        address: '',
      });
    expect(res.statusCode).toEqual(401);
  });
  it('create contact without last name', async () => {
    const res = await request(app)
      .post('/api/v1/contacts')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        firstName: 'First Name',
        phoneNumber: '+962XXXXXXXXX',
        address: '',
      });
    expect(res.statusCode).toEqual(400);
  });
  it('create contact ', async () => {
    const res = await request(app)
      .post('/api/v1/contacts')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        firstName: 'First Name',
        lastName: 'Last Name',
        phoneNumber: '+962XXXXXXXXX',
        address: '',
      });
    expect(res.statusCode).toEqual(400);
  });
  // afterAll(done => {
  // })
});
