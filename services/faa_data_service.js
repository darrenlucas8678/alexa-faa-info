'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://services.faa.gov/airport/status/';

function FAADataHelper() {};
FAADataHelper.prototype.requestAirportStatus = function (airportCode) {
    return this.getAirportStatusCode(airportCode).then(function (response) {
        console.log('success - received airport info for ' + airportCode);
        return response.body;
    });
};
FAADataHelper.prototype.getAirportStatusCode = function (airportCode) {
    var options = {
        method: 'GET'
        , uri: ENDPOINT + airportCode
        , resolveWithFullResponse: true
        , json: true
    };
    return rp(options);
};
FAADataHelper.prototype.formatAirportStatus = function (response) {
    var weather = _.template('The current weather conditions are ${weather}, ${temp} and wind ${wind}.')({
        weather: response.weather.weather
        , temp: response.weather.temp
        , wind: response.weather.wind
    });
    if (response.delay === 'true') {
        return _.template('There is currently a delay for ${airport}. The average delay time is ${delay_time}. Delay is because of the following: ${delay_reason}. ${weather}')({
            airport: response.name
            , delay_time: response.status.avgDelay
            , delay_reason: response.status.reason
            , weather: weather
        });
    }
    else {
        return _.template('There is currently no delays at ${airport}. ${weather}')({
            airport: response.name
            , weather: weather
        });
    }
};
module.exports = FAADataHelper;