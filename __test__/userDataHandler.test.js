const request = require('supertest');

const app = require('../app');

describe('POST /users/login', () => {
    beforeAll(() => {
      console.log('before all');
    });
    beforeEach(() => {
      console.log('before each');
    });
    afterEach(() => {
      console.log('after each');
    });
    afterAll(() => {
      console.log('after all');
    });
  
    it('should return user and token', async () => {
     
      const testData = {
        email: 'lucas@mail.com',
        password: 'bytgHt123&^YTY',
      };
  
      const res = await request(app).post('/api/users/login').send(testData);

     
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
          user: expect.any(Object),
        })
      );
    });
  
    it('should return unauthorized error', async () => {
      const testData = {
        email: 'lucasa@mail.com',
        password: 'bytgHt123&^YTY',
      };
  
      const res = await request(app).post('/api/users/login').send(testData);
  
      expect(res.statusCode).toBe(401);
    });
  
    it('should return unauthorized error', async () => {
      const testData = {
        email: 'lucas@mail.com',
      };
  
      const res = await request(app).post('/api/users/login').send(testData);
  
      expect(res.statusCode).toBe(401);
    });
  });