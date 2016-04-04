describe('Feathers application tests', () => {
  before(function (done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function (done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () => {
    return request.get('/')
      .expect(200)
      .expect(({ text }) => {
        assert.ok(~text.indexOf('<html>'));
      });
  });

  describe('404', () => {
    it('shows a 404 HTML page', () => {
      return request.get('/path/to/nowhere').expect(404);
    });
  });
});
