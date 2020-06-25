const weather = document.querySelector('.js-weather');

const API_KEY = '2ae17493b8d0ce9363a18c1f4c1f1265';
const COORDS = 'coords';

//외부api에서 날씨 데이터를 가져오기
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      console.log(json);
      weather.innerHTML = `${temperature} @ ${place}`;
    });
  //than을 이용하여 뭔가가 끝나기를 기다리게 함
}

//따로 로컬 스토리지에 저장해주는 함수

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//좌표를 가져오는데 성공했을 시 실행될 함수
function geoSuccesHandler(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

//좌표를 가져오는데 실패했으 시 실행될 함수
function geoErrorHandler() {
  console.log('Cant access geo location');
}

//좌표를 가져오는 함수
function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccesHandler, geoErrorHandler);
}

//좌표를 검사
function loadCoords() {
  //로컬스토리지의 좌표값을 할당한다
  const loadCoords = localStorage.getItem(COORDS);

  //할당할 좌표값이 없다면
  if (loadCoords === null) {
    askForCoords();
    //좌표값이 있다면?
  } else {
    const parseCoords = JSON.parse(loadCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
