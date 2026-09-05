const mongoose = require('mongoose');
const { request, app, signup, seedState } = require('./helpers');

describe('Places, states and favorites', () => {
  it('lists states and fetches one by slug with counts', async () => {
    await seedState();
    const list = await request(app).get('/api/states');
    expect(list.status).toBe(200);
    expect(list.body.data).toHaveLength(1);

    const one = await request(app).get('/api/states/rajasthan');
    expect(one.status).toBe(200);
    expect(one.body.data.slug).toBe('rajasthan');
    expect(one.body.data.counts.monument).toBe(1);
    expect(one.body.data.counts.crafts).toBe(1);

    const missing = await request(app).get('/api/states/nowhere');
    expect(missing.status).toBe(404);
  });

  it('filters places by state and type with pagination metadata', async () => {
    await seedState();
    const res = await request(app).get('/api/places?state=rajasthan&type=temple');
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(1);
    expect(res.body.data[0].name_en).toBe('Brahma Temple');
    expect(res.body.page).toBe(1);

    const bad = await request(app).get('/api/places?type=castle');
    expect(bad.status).toBe(400);
  });

  it('increments viewCount on detail fetch and handles bad ids', async () => {
    const { places } = await seedState();
    const id = places[0]._id.toString();

    const first = await request(app).get(`/api/places/${id}`);
    expect(first.status).toBe(200);
    expect(first.body.data.viewCount).toBe(1);
    expect(first.body.data.stateId.slug).toBe('rajasthan');

    const second = await request(app).get(`/api/places/${id}`);
    expect(second.body.data.viewCount).toBe(2);

    const unknown = await request(app).get(`/api/places/${new mongoose.Types.ObjectId()}`);
    expect(unknown.status).toBe(404);

    const invalid = await request(app).get('/api/places/not-an-id');
    expect(invalid.status).toBe(400);
  });

  it('returns a random place', async () => {
    await seedState();
    const res = await request(app).get('/api/random');
    expect(res.status).toBe(200);
    expect(res.body.data.name_en).toBeTruthy();
  });

  it('adds and removes favorites for an authenticated user', async () => {
    const { places } = await seedState();
    const { token } = await signup();
    const id = places[0]._id.toString();

    const add = await request(app).post(`/api/user/favorites/${id}`).set('Authorization', `Bearer ${token}`);
    expect(add.status).toBe(200);
    expect(add.body.data.map(String)).toContain(id);

    const list = await request(app).get('/api/user/favorites').set('Authorization', `Bearer ${token}`);
    expect(list.body.data).toHaveLength(1);
    expect(list.body.data[0].name_en).toBe('Hawa Mahal');

    const remove = await request(app)
      .delete(`/api/user/favorites/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(remove.status).toBe(200);
    expect(remove.body.data).toHaveLength(0);

    const anon = await request(app).get('/api/user/favorites');
    expect(anon.status).toBe(401);
  });
});
