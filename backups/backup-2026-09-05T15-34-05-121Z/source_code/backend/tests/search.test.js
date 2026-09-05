const { request, app, seedState } = require('./helpers');

describe('Search, feedback and chatbot', () => {
  it('searches across collections and returns resultType + linkTo', async () => {
    const { craft } = await seedState();

    const res = await request(app).get('/api/search?q=Hawa');
    expect(res.status).toBe(200);
    const place = res.body.data.find((r) => r.resultType === 'place');
    expect(place).toBeTruthy();
    expect(place.linkTo).toMatch(/^\/item\/places\//);

    const craftRes = await request(app).get('/api/search?q=pottery');
    const found = craftRes.body.data.find((r) => r.resultType === 'craft');
    expect(found.linkTo).toBe(`/item/crafts/${craft._id}`);

    const stateRes = await request(app).get('/api/search?q=rajas');
    expect(stateRes.body.data.some((r) => r.resultType === 'state' && r.linkTo === '/state/rajasthan')).toBe(true);

    const empty = await request(app).get('/api/search?q=');
    expect(empty.body.data).toEqual([]);
  });

  it('accepts anonymous feedback and validates rating', async () => {
    const ok = await request(app).post('/api/feedback').send({ message: 'Great website!', rating: 5 });
    expect(ok.status).toBe(201);
    expect(ok.body.data.kind).toBe('general');

    const noRating = await request(app).post('/api/feedback').send({ message: 'Missing rating' });
    expect(noRating.status).toBe(400);

    const { places } = await seedState();
    const report = await request(app)
      .post('/api/feedback')
      .send({ message: 'Wrong opening hours', kind: 'report', placeId: places[0]._id.toString() });
    expect(report.status).toBe(201);
    expect(report.body.data.kind).toBe('report');
  });

  it('chatbot answers intents, finds entities and escalates to a human', async () => {
    await seedState();

    const intent = await request(app).post('/api/chatbot/message').send({ message: 'What food is famous?' });
    expect(intent.status).toBe(200);
    expect(intent.body.escalate).toBe(false);
    expect(intent.body.reply.en).toMatch(/Food tile/i);
    expect(intent.body.sessionId).toBeTruthy();

    const entity = await request(app)
      .post('/api/chatbot/message')
      .send({ message: 'Tell me about Hawa Mahal', sessionId: intent.body.sessionId });
    expect(entity.body.reply.en).toMatch(/Hawa Mahal is in Rajasthan/);
    expect(entity.body.links[0].to).toMatch(/^\/item\/places\//);

    const human = await request(app)
      .post('/api/chatbot/message')
      .send({ message: 'I want to talk to an agent', sessionId: intent.body.sessionId });
    expect(human.body.escalate).toBe(true);
    expect(human.body.phone).toBe('8502947105');
  });
});
