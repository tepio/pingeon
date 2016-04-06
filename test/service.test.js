require('./test-env');

const data = { id: 'sdsdsd' };

describe('Service', () => {

  // it('starts and shows the index page', () => {
  //   return request.post('/users/custom?some=1')
  //     .send(data)
  //     .expect(201)
  //     .expect(({ body }) => {
  //       assert.deepEqual(body.data, data);
  //     });
  // });  
  
  it('starts and shows the index page', () => {
    return request.put('/recipients/:id/service')
      .send(data)
      .expect(200)
      .expect(({ body }) => {
        console.log(body);
        assert.deepEqual(body.data, data);
      });
  });

});
