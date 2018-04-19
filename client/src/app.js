const MapView = require('./views/mapView');
const ListView = require('./views/listView');
const Bucketlist = require('./models/bucketlist');
const Request = require('./services/request.js');

// const mapView = new MapView();
const listView = new ListView();
const bucketlist = new Bucketlist();
const request1 = new Request('http://localhost:3000/api/bucketlist');
const request2 = new Request('https://restcountries.eu/rest/v2/all');

const getPlacesRequestComplete = function(allplaces){
  console.log(allplaces);
  allplaces.forEach(function(place){
    bucketlist.addPlace(place);
  });
}

const getCountriesRequestComplete = function(countries){
  console.log(countries);
  listView.populateSelect(countries);
  }

const submitButtonClicked = function(event){
  event.preventDefault();
  const nameInputValue = document.querySelector('#country-list');
  const landmarksInputValue = document.querySelector('#landmarks').value;
  const whenInputValue = document.querySelector('#when').value;

  const bucketlistObject = {
    name: nameInputValue,
    landmarks: landmarksInputValue,
    when: whenInputValue
  }

  request1.post(submitComplete, bucketlistObject);
}

const submitComplete = function(response){
  bucketlist.addPlace(response);
}

const deleteAllButtonClicked = function(){
  request1.delete(deleteAllComplete);
  debugger;
}

const deleteAllComplete = function(){
  bucketlist.clear();
}


const appStart = function(){
  request1.get(getPlacesRequestComplete);
  request2.get(getCountriesRequestComplete);
  const submitButton = document.querySelector('#submit-place');
  submitButton.addEventListener('click', submitButtonClicked);
  const deleteAllButton = document.querySelector('#deleteAllButton');
  deleteAllButton.addEventListener('click', deleteAllButtonClicked);

}


document.addEventListener('DOMContentLoaded', appStart);
