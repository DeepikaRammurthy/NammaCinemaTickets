'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviesmappingendpoint;

describe('Moviesmappingendpoint API:', function() {

  describe('GET /api/moviesmappingendpoints', function() {
    var moviesmappingendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesmappingendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesmappingendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviesmappingendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/moviesmappingendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviesmappingendpoints')
        .send({
          name: 'New Moviesmappingendpoint',
          info: 'This is the brand new moviesmappingendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMoviesmappingendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created moviesmappingendpoint', function() {
      expect(newMoviesmappingendpoint.name).to.equal('New Moviesmappingendpoint');
      expect(newMoviesmappingendpoint.info).to.equal('This is the brand new moviesmappingendpoint!!!');
    });

  });

  describe('GET /api/moviesmappingendpoints/:id', function() {
    var moviesmappingendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesmappingendpoints/' + newMoviesmappingendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesmappingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      moviesmappingendpoint = {};
    });

    it('should respond with the requested moviesmappingendpoint', function() {
      expect(moviesmappingendpoint.name).to.equal('New Moviesmappingendpoint');
      expect(moviesmappingendpoint.info).to.equal('This is the brand new moviesmappingendpoint!!!');
    });

  });

  describe('PUT /api/moviesmappingendpoints/:id', function() {
    var updatedMoviesmappingendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/moviesmappingendpoints/' + newMoviesmappingendpoint._id)
        .send({
          name: 'Updated Moviesmappingendpoint',
          info: 'This is the updated moviesmappingendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMoviesmappingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviesmappingendpoint = {};
    });

    it('should respond with the updated moviesmappingendpoint', function() {
      expect(updatedMoviesmappingendpoint.name).to.equal('Updated Moviesmappingendpoint');
      expect(updatedMoviesmappingendpoint.info).to.equal('This is the updated moviesmappingendpoint!!!');
    });

  });

  describe('DELETE /api/moviesmappingendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/moviesmappingendpoints/' + newMoviesmappingendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviesmappingendpoint does not exist', function(done) {
      request(app)
        .delete('/api/moviesmappingendpoints/' + newMoviesmappingendpoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
