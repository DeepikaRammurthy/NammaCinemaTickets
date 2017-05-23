'use strict';

var app = require('../..');
import request from 'supertest';

var newSeatbookendpoint;

describe('Seatbookendpoint API:', function() {

  describe('GET /api/seatbookendpoints', function() {
    var seatbookendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatbookendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatbookendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seatbookendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/seatbookendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seatbookendpoints')
        .send({
          name: 'New Seatbookendpoint',
          info: 'This is the brand new seatbookendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSeatbookendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created seatbookendpoint', function() {
      expect(newSeatbookendpoint.name).to.equal('New Seatbookendpoint');
      expect(newSeatbookendpoint.info).to.equal('This is the brand new seatbookendpoint!!!');
    });

  });

  describe('GET /api/seatbookendpoints/:id', function() {
    var seatbookendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatbookendpoints/' + newSeatbookendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatbookendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      seatbookendpoint = {};
    });

    it('should respond with the requested seatbookendpoint', function() {
      expect(seatbookendpoint.name).to.equal('New Seatbookendpoint');
      expect(seatbookendpoint.info).to.equal('This is the brand new seatbookendpoint!!!');
    });

  });

  describe('PUT /api/seatbookendpoints/:id', function() {
    var updatedSeatbookendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/seatbookendpoints/' + newSeatbookendpoint._id)
        .send({
          name: 'Updated Seatbookendpoint',
          info: 'This is the updated seatbookendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeatbookendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeatbookendpoint = {};
    });

    it('should respond with the updated seatbookendpoint', function() {
      expect(updatedSeatbookendpoint.name).to.equal('Updated Seatbookendpoint');
      expect(updatedSeatbookendpoint.info).to.equal('This is the updated seatbookendpoint!!!');
    });

  });

  describe('DELETE /api/seatbookendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/seatbookendpoints/' + newSeatbookendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seatbookendpoint does not exist', function(done) {
      request(app)
        .delete('/api/seatbookendpoints/' + newSeatbookendpoint._id)
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
