/**
 * Created by spriadka on 1/5/17.
 */


var mediator = require('../lib/mediator');

var assert = require('assert');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var sinonChai = require('sinon-chai');
var Promise = require('bluebird');
var sinonStubPromised = require('sinon-stub-promise');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

sinonStubPromised(sinon);

sinon.config = {
    useFakeTimers: false
};

describe('Promise',function(){
    const TEST_CHANNEL = "promise:channel";

    it('Should call delayed callback',function(done){
        this.timeout(5000);
        var promiseCB = sinon.stub();
        mediator.promise(TEST_CHANNEL).then(promiseCB);
        var promised = Promise.delay(500,"WUHU");
        mediator.publish(TEST_CHANNEL,promised);
        setTimeout(function(){
            sinon.assert.called(promiseCB);
            sinon.assert.calledWith(promiseCB.getCall(0),"WUHU");
            done();
        },2000);
    });

    it('Should be called only once',function(done){
        this.timeout(5000);
        var promiseCB = sinon.stub();
        mediator.promise(TEST_CHANNEL).then(promiseCB);
        var promised = Promise.delay(500,{
            goodCharacters: ['Frodo','Aragorn','Legolas'],
            evilOnes: ['Sauron','Saruman']
        });
        mediator.publish(TEST_CHANNEL,promised);
        mediator.publish(TEST_CHANNEL,['Another','Set','Of','Data','That','Should','Not','Be','Accepted']);
        setTimeout(function(){
            sinon.assert.callCount(promiseCB,1);
            done();
        },2000);
    });

    it('Should call error callback',function(done){
        this.timeout(5000);
        var successCB = sinon.spy();
        var errorCB = sinon.spy();
        mediator.promise(TEST_CHANNEL).then(successCB,errorCB);
        var rejectedData = Promise.reject({
            error: 'Boromir died'
        }).delay(500);
        mediator.publish(TEST_CHANNEL,rejectedData);
        setTimeout(function(){
            sinon.assert.notCalled(successCB);
            sinon.assert.callCount(errorCB,1);
            done();
        },2000);
    });
});