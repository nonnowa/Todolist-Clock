const form = document.querySelector('.js-form'),
  input = form.querySelector('input'),
  greetings = document.querySelector('.js-greetings');

const USER_LOCALSTORAGE = 'currentUser';
const SHOWING_CLASSNAME = 'showing';

// 로컬스토리지에 값을 저장하는 함수
function saveName(text) {
  localStorage.setItem(USER_LOCALSTORAGE, text);
}

//서브밋 했을 때 일어나는 이벤트 함수
function submitHadeler(event) {
  //submit 이벤트 초기화
  event.preventDefault();
  //input 값을 저장하는 공간
  const currentValue = input.value;
  //로컬스토리지에 값을 저장
  saveName(currentValue);

  //★☆서브밋 했을 시 바로! 불러오기
  paintGreeting(currentValue);
}

//이름 물어보기
function askForName() {
  form.classList.add(SHOWING_CLASSNAME);
  form.addEventListener('submit', submitHadeler);
}

//
function paintGreeting(text) {
  form.classList.remove(SHOWING_CLASSNAME);
  greetings.classList.add(SHOWING_CLASSNAME);
  greetings.innerText = `오늘 좀 어때요? ${text}`;
}

//이름이 있는지 검사하는 함수
function loadName() {
  const currentUser = localStorage.getItem(USER_LOCALSTORAGE);

  //이름이 없다면?
  if (currentUser === null) {
    askForName();
    console.log('값없음');
  } else {
    console.log('값있음');
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();
