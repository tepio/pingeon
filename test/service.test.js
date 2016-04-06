require('./test-env');

const data = { userId: 'sdsdsd' };

describe('Service', () => {

  it('starts and shows the index page', () => {
    return request.post('/users/custom?some=1')
      .send(data)
      .expect(201)
      .expect(({ body }) => {
        assert.deepEqual(body.data, data);
      });
  });

});
