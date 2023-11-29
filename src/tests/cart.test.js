const request = require('supertest');
const app = require('../app');
require('../models/index');

let token;
let id;

beforeAll(async () => {
    const user = {
        email: "test@email.com",
        password: "123456"
    };
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
});

test('GET /cart', async () => {
    const res = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart', async () => {
    const cart = {
        quantity: 5
    };
    const res = await request(app)
        .post("/cart")
        .send(cart)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(cart.quantity);
});


test('PUT /cart/:id', async () => {
    const cart = {quantity: 5};
    const res = await request(app)
    .put(`/cart/${id}`)
    .send(cart)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cart.quantity);
});

test('DELETE /cart/:id', async () => {
    const res = await request(app)
        .delete(`/cart/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});