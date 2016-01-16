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
    var dewpoint = data.current_observation.dewpoint_f;
    var feelslike = data.current_observation.feelslike_f;
    var tempf = data.current_observation.temp_f;
    var icon = data.current_observation.icon_url;
    var lastUpdate = data.current_observation.observation_time;
    var weather = data.current_observation.weather;
    var wind = data.current_observation.wind_string;
    firstData(ultraV, dewpoint, feelslike, tempf, icon, lastUpdate, weather, wind)
  })
  .error(function(err){console.log('error', err)})
  $.get('http://api.wunderground.com/api/b8e39627c52c5f82/almanac/q/'+state+'/'+city+'.json')
  .success(function(data){
    var recHiTemp = data.almanac.temp_high.record.F;
    var recLowTemp = data.almanac.temp_low.record.F;
    var recordHiYear = data.almanac.temp_high.recordyear;
    var recordLowYear = data.almanac.temp_low.recordyear;
    secondData(recHiTemp, recLowTemp, recordLowYear, recordHiYear);
  })
  .error(function(err){console.log('error', err)})
  $.get('http://api.wunderground.com/api/b8e39627c52c5f82/astronomy/q/'+state+'/'+city+'.json')
  .success(function(data){
    var sunriseH = data.sun_phase.sunrise.hour;
    var sunsetH = data.sun_phase.sunset.hour;
    var sunriseM = data.sun_phase.sunrise.minute;
    var sunsetM = data.sun_phase.sunset.minute;
    thirdData(sunriseM, sunriseH, sunsetM, sunsetH);
  })
  .error(function(err){console.log('error', err)})
}
function firstData(ultraV, dewpoint, feelslike, tempf, icon, lastUpdate, weather, wind){
  $('#ultraV').append('UV level = '+ultraV);
  $('#dewpoint').append('Dewpoint: '+dewpoint);
  $('#feelslike').append('Feelslike: '+feelslike);
  $('#temp').append('Temp: '+tempf);
  $('#icon').css({'background-image': 'url('+icon+')', 'background-position': 'centered', 'background-repeat': 'no-repeat',  'background-size': 'contain'})
  $('#lastUpdate').append(lastUpdate);
  $('#weather').append(weather);
  $('#wind').append(wind);
}

function secondData(recHiTemp, recLowTemp, recordLowYear, recordHiYear){
  $('#recordHi').append('Record high for to day was '+recHiTemp+'. Set in '+recordHiYear+'.');
  $('#recordLow').append('Record low for to day was '+recLowTemp+'. Set in '+recordLowYear+'.');

}

function thirdData(sunriseM, sunriseH, sunsetM, sunsetH){
  $('#sunrise').append('Sunrise today at '+sunriseH+':'+sunriseM+' AM.');
  $('#sunset').append('Sunset today at '+sunsetH+':'+sunsetM+' PM.');

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
