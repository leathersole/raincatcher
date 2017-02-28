'use strict';

var mediator = require('fh-wfm-mediator/lib/mediator')
  , should = require('should')
  ;


var counter, subs;

describe('Hierarchy of listeners:', function () {
  beforeEach(function(done) {
    counter = {
      root: 0,
      load: 0,
      done: 0,
      error: 0
    }
    subs = {
      root: mediator.subscribe('root', function() {
        counter.root++;
      }),
      load: mediator.subscribe('root:load', function() {
        counter.load++;
      }),
      done: mediator.subscribe('root:load:done', function() {
        counter.done++;
      }),
      error: mediator.subscribe('root:load:error', function() {
        counter.error++;
      })
    }
    done();
  });

  afterEach(function(done) {
    mediator.remove('root', subs.id);
    mediator.remove('root:load', subs.load.id);
    mediator.remove('root:load:done', subs.done.id);
    mediator.remove('root:load:error', subs.error.id);
    done();
  });

  it('load triggers parent', function(done) {
    mediator.publish('root:load');
    counter.root.should.be.equal(1, 'root counter is 1');
    counter.load.should.be.equal(1, 'load counter is 1');
    done();
  });

  it('done triggers parents', function(done) {
    mediator.publish('root:load');
    mediator.publish('root:load:done');
    counter.root.should.be.equal(2, 'root counter is 2');
    counter.load.should.be.equal(2, 'load counter is 2');
    counter.done.should.be.equal(1, 'done counter is 1');
    done();
  });
});

describe('Parallel listeners:', function () {
  beforeEach(function(done) {
    counter = {
      root: 0,
      load: 0,
      done: 0,
      error: 0
    }
    subs = {
      root: mediator.subscribe('root', function() {
        counter.root++;
      }),
      load: mediator.subscribe('root:load', function() {
        counter.load++;
      }),
      done: mediator.subscribe('root:load-done', function() {
        counter.done++;
      }),
      error: mediator.subscribe('root:load-error', function() {
        counter.error++;
      })
    }
    done();
  });

  afterEach(function(done) {
    mediator.remove('root', subs.id);
    mediator.remove('root:load', subs.load.id);
    mediator.remove('root:load-done', subs.done.id);
    mediator.remove('root:load-error', subs.error.id);
    done();
  });

  it('load triggers parent', function(done) {
    mediator.publish('root:load');
    counter.root.should.be.equal(1, 'root counter is 1');
    counter.load.should.be.equal(1, 'load counter is 1');
    done();
  });

  it('done doesnt trigger immediate parent', function(done) {
    mediator.publish('root:load');
    mediator.publish('root:load-done');
    counter.root.should.be.equal(2, 'root counter is 2');
    counter.load.should.be.equal(1, 'load counter is 1');
    counter.done.should.be.equal(1, 'done counter is 1');
    done();
  });
});

describe('Reverse hierarchy listeners:', function () {
  beforeEach(function(done) {
    counter = {
      root: 0,
      load: 0,
      done: 0,
      error: 0
    }
    subs = {
      root: mediator.subscribe('root', function() {
        counter.root++;
      }),
      load: mediator.subscribe('root:load', function() {
        counter.load++;
      }),
      done: mediator.subscribe('done:root:load', function() {
        counter.done++;
      }),
      error: mediator.subscribe('error:root:load', function() {
        counter.error++;
      })
    }
    done();
  });

  afterEach(function(done) {
    mediator.remove('root', subs.id);
    mediator.remove('root:load', subs.load.id);
    mediator.remove('done:root:load', subs.done.id);
    mediator.remove('error:root:load', subs.error.id);
    done();
  });

  it('load triggers parent', function(done) {
    mediator.publish('root:load');
    counter.root.should.be.equal(1, 'root counter is 1');
    counter.load.should.be.equal(1, 'load counter is 1');
    done();
  });

  it('done doesnt trigger parents', function(done) {
    mediator.publish('root:load');
    mediator.publish('done:root:load');
    counter.root.should.be.equal(1, 'root counter is 1');
    counter.load.should.be.equal(1, 'load counter is 1');
    counter.done.should.be.equal(1, 'done counter is 1');
    done();
  });
});
