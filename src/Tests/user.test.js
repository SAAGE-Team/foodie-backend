const request = require('supertest');
const app = require('../../app');

describe('API Endpoints', () => {
  let token;

  // Register endpoint test
  describe('POST /register', () => {
    it('registers a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password'
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
    });
  });

  // Get all users endpoint test
  describe('GET /allusers', () => {
    it('gets all users', async () => {
      const response = await request(app)
        .get('/allusers')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  // Verify email endpoint test
  describe('POST /verify_email', () => {
    it('verifies email with valid code', async () => {
      const response = await request(app)
        .post('/verify_email')
        .send({
          email: 'johndoe@example.com',
          code: '123456'
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Email verified successfully');
    });
  });

  // Login endpoint test
  describe('POST /login', () => {
    it('logs in a user with valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'johndoe@example.com',
          password: 'password'
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
    });
  });

  // Get a user endpoint test
  describe('GET /:id', () => {
    it('gets a user by ID', async () => {
      const response = await request(app)
        .get('/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });
  });

  // Update a user endpoint test
  describe('PUT /:id', () => {
    it('updates a user', async () => {
      const response = await request(app)
        .put('/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Jane Doe'
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'Jane Doe');
    });
  });

  // Delete a user endpoint test
  describe('DELETE /:id', () => {
    it('deletes a user', async () => {
      const response = await request(app)
        .delete('/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
  });
});
