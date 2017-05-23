'use strict';

var app = require('../..');
import request from 'supertest';

var newSeatbookingendpoint;

describe('Seatbookingendpoint API:', function() {

  describe('GET /api/seatbookingendpoints', function() {
    var seatbookingendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatbookingendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatbookingendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seatbookingendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/seatbookingendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seatbookingendpoints')
        .send({
          name: 'New Seatbookingendpoint',
          info: 'This is the brand new seatbookingendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSeatbookingendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created seatbookingendpoint', function() {
      expect(newSeatbookingendpoint.name).to.equal('New Seatbookingendpoint');
      expect(newSeatbookingendpoint.info).to.equal('This is the brand new seatbookingendpoint!!!');
    });

  });

  describe('GET /api/seatbookingendpoints/:id', function() {
    var seatbookingendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatbookingendpoints/' + newSeatbookingendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatbookingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      seatbookingendpoint = {};
    });

    it('should respond with the requested seatbookingendpoint', function() {
      expect(seatbookingendpoint.name).to.equal('New Seatbookingendpoint');
      expect(seatbookingendpoint.info).to.equal('This is the brand new seatbookingendpoint!!!');
    });

  });

  describe('PUT /api/seatbookingendpoints/:id', function() {
    var updatedSeatbookingendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/seatbookingendpoints/' + newSeatbookingendpoint._id)
        .send({
          name: 'Updated Seatbookingendpoint',
          info: 'This is the updated seatbookingendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeatbookingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeatbookingendpoint = {};
    });

    it('should respond with the updated seatbookingendpoint', function() {
      expect(updatedSeatbookingendpoint.name).to.equal('Updated Seatbookingendpoint');
      expect(updatedSeatbookingendpoint.info).to.equal('This is the updated seatbookingendpoint!!!');
    });

  });

  describe('DELETE /api/seatbookingendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/seatbookingendpoints/' + newSeatbookingendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seatbookingendpoint does not exist', function(done) {
      request(app)
        .delete('/api/seatbookingendpoints/' + newSeatbookingendpoint._id)
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
