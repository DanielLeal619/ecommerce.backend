const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users', async () => {
    const user = {
        firstName: "Pawer",
        lastName: "Devia",
        email: "pawer@email.com",
        password: "123456",
        phone: "123456789"
    };
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

test('POST /users/login', async () => {
    const user = {
        email: "pawer@email.com",
        password: "123456"
    };
    const res = await request(app).post("/users/login").send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users', async () => {
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const user = {firstName: "Pawer test"};
    const res = await request(app)
    .put(`/users/${id}`)
    .send(user)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test('POST /users/login wrong credentials', async () => {
    const user = {
        email: "pawerfake@email.com",
        password: "123456fake"
    };
    const res = await request(app).post("/users/login").send(user);
    expect(res.status).toBe(401);    
});


test('DELETE /users/:id', async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});