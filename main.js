'use strict';

$(document).ready(init);
  
// var cityScope = '';
// var stateScope = '';

function init() {
  $('button').on('click', init);
  // $('#icon').on('click', radar)
  $.get('http://api.wunderground.com/api/b8e39627c52c5f82/geolookup/q/autoip.json')
  .success(function(data){
    $('#icon, #weather, #wind, #lastUpdate, #temp, #feelslike, #dewpoint, #recordHi, #recordLow, #sunrise, #sunset, #ultraV').empty();
    var city = data.location.city.split(' ').join('_');
    var state = data.location.state;
    getWeatherfrom(city, state);
  })
  .error(function(err){console.log('error', err)})
  $('#inputBTN').on('click', place)
}

function place(e){
  e.preventDefault();
  $('#icon, #weather, #wind, #lastUpdate, #temp, #feelslike, #dewpoint, #recordHi, #recordLow, #sunrise, #sunset, #ultraV').empty();
  var theCity = $('#inputCity').val();
  var theState = $('#inputState').val().toUpperCase();
  getWeatherfrom(theCity, theState);
}

function getWeatherfrom(city, state){
  // cityScope = city;
  // stateScope = state;

  $.get('http://api.wunderground.com/api/b8e39627c52c5f82/conditions/q/'+state+'/'+city+'.json')
  .success(function(data){

    var ultraV = data.current_observation.UV;
    $('#ultraV').append('UV level = '+ultraV);
    var dewpoint = data.current_observation.dewpoint_f;
    $('#dewpoint').append('Dewpoint: '+dewpoint);
    var feelslike = data.current_observation.feelslike_f;
    $('#feelslike').append('Feelslike: '+feelslike);
    var tempf = data.current_observation.temp_f;
    $('#temp').append('Temp: '+tempf);console.log(tempf);
    var icon = data.current_observation.icon_url;
    $('#icon').css({'background-image': 'url('+icon+')', 'background-position': 'centered', 'background-repeat': 'no-repeat',  'background-size': 'contain'})
    var lastUpdate = data.current_observation.observation_time;
    $('#lastUpdate').append(lastUpdate);
    var weather = data.current_observation.weather;
    $('#weather').append(weather);
    var wind = data.current_observation.wind_string;
    $('#wind').append(wind);

  })
  .error(function(err){console.log('error', err)})
  $.get('http://api.wunderground.com/api/b8e39627c52c5f82/almanac/q/'+state+'/'+city+'.json')
  .success(function(data){
    var recHiTemp = data.almanac.temp_high.record.F;
    var recLowTemp = data.almanac.temp_low.record.F;
    var recordHiYear = data.almanac.temp_high.recordyear;
    var recordLowYear = data.almanac.temp_low.recordyear;
    $('#recordHi').append('Record high for to day was '+recHiTemp+'. Set in '+recordHiYear+'.');
    $('#recordLow').append('Record low for to day was '+recLowTemp+'. Set in '+recordLowYear+'.');

  })
  .error(function(err){console.log('error', err)})
  $.get('http://api.wunderground.com/api/b8e39627c52c5f82/astronomy/q/'+state+'/'+city+'.json')
  .success(function(data){
    var sunriseH = data.sun_phase.sunrise.hour;
    var sunsetH = data.sun_phase.sunset.hour;
    var sunriseM = data.sun_phase.sunrise.minute;
    var sunsetM = data.sun_phase.sunset.minute;
    $('#sunrise').append('Sunrise today at '+sunriseH+':'+sunriseM+' AM.');
    $('#sunset').append('Sunset today at '+sunsetH+':'+sunsetM+' PM.');

  })
  .error(function(err){console.log('error', err)})
}
// console.log(cityScope, stateScope);
// function radar() {
// $.get('http://api.wunderground.com/api/b8e39627c52c5f82/radar/q/'+stateScope+'/'+cityScope+'.gif?width=280&height=280&newmaps=1')
// .success(function(data){
// console.log(data);
//
// })
// .error(function(err){console.log('error', err)})
// }
