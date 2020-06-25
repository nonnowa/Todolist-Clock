//바꿀 바디 가져오기

const body = document.querySelector('body');

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./images/${imgNumber + 1}.jpg`;
  image.classList.add('bgImg');
  body.appendChild(image);

  console.log(image);
}

//랜덤한 숫자를 리턴하는 함수
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
