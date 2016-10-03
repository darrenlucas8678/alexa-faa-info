'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var FAADataHelper = require('../services/faa_data_service');
chai.config.includeStack = true;

describe('FAADataHelper', function () {
    var subject = new FAADataHelper()
    var airport_code;
    describe('#getAirportStatus', function () {
        this.slow(3000);
        context('with a valid airport code', function () {
            it('returns matching airport code', function () {
                airport_code = 'SFO';
                var value = subject.requestAirportStatus(airport_code).then(function (obj) {
                    return obj.IATA;
                });
                return expect(value).to.eventually.eq(airport_code);
            });
        });
    });
    describe('#getAirportStatus', function () {
        context('with a invalid airport code', function () {
            it('is rejected', function () {
                airport_code = 'ABC';
                return expect(subject.requestAirportStatus(airport_code)).to.be.rejectedWith(Error);
            });
        });
    });
    describe('#formatAirportStatus', function () {
        before(function () {
            var status = {
                'delay': 'true'
                , 'name': 'Hartsfield-Jackson Atlanta International'
                , 'ICAO': 'KATL'
                , 'city': 'Atlanta'
                , 'weather': {
                    'visibility': 5.00
                    , 'weather': 'Light Snow'
                    , 'meta': {
                        'credit': 'NOAA\'s National Weather Service'
                        , 'updated': '3:54 PM Local'
                        , 'url': 'http://weather.gov/'
                    }
                    , 'temp': '36.0 F (2.2 C)'
                    , 'wind': 'Northeast at 9.2mph'
                }
                , 'status': {
                    'reason': 'AIRLINE REQUESTED DUE TO DE-ICING AT AIRPORT / DAL AND DAL SUBS ONLY'
                    , 'closureBegin': ''
                    , 'endTime': ''
                    , 'minDelay': ''
                    , 'avgDelay': '57 minutes'
                    , 'maxDelay': ''
                    , 'closureEnd': ''
                    , 'trend': ''
                    , 'type': 'Ground Delay'
                }
            };
        });
        context('with a status containing no delay', function(){
            it('formats the status as expected');
        });
        context('with a status containing a delay', function(){
            it('formats the status as expected');
        })
    });
});