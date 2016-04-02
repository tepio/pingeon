describe('Feathers application tests', () => {
  before(function (done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function (done) {
    this.server.close(done);
  });

  it('starts and shows the index page', done => {
    fetcher.get('/')
      .then(({ data }) => {
        assert.ok(data.indexOf('<html>') !== -1);
        done();
      }).catch(done);
  });

  describe('404', () => {
    it('shows a 404 HTML page', done => {
      fetcher.get('/path/to/nowhere')
        .catch(err => {
          assert.equal(err.status, 404);
          done();
        });
    });
  });
});
