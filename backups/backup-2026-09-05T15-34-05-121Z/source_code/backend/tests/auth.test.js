const { request, app, signup, makeAdmin } = require('./helpers');

describe('Auth', () => {
  it('signs up, logs in and returns the current user', async () => {
    const { res, payload } = await signup();
    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.email).toBe(payload.email.toLowerCase());
    expect(res.body.user.passwordHash).toBeUndefined();

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: payload.email, password: payload.password });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeTruthy();

    const me = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${login.body.token}`);
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe(payload.email.toLowerCase());
  });

  it('rejects duplicate emails with 409', async () => {
    const { payload } = await signup();
    const dup = await request(app).post('/api/auth/signup').send(payload);
    expect(dup.status).toBe(409);
    expect(dup.body.error).toMatch(/already in use/i);
  });

  it('validates input with 400', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ name: 'A', email: 'not-an-email', password: 'short' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('returns 401 for wrong credentials and missing token', async () => {
    const { payload } = await signup();
    const bad = await request(app)
      .post('/api/auth/login')
      .send({ email: payload.email, password: 'wrong-password' });
    expect(bad.status).toBe(401);

    const me = await request(app).get('/api/auth/me');
    expect(me.status).toBe(401);
  });

  it('blocks non-admin users from admin routes with 403', async () => {
    const { token, user } = await signup();
    const denied = await request(app).get('/api/feedback').set('Authorization', `Bearer ${token}`);
    expect(denied.status).toBe(403);

    await makeAdmin(user._id);
    const allowed = await request(app).get('/api/feedback').set('Authorization', `Bearer ${token}`);
    expect(allowed.status).toBe(200);
    expect(Array.isArray(allowed.body.data)).toBe(true);
  });
});
