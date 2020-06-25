const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDo');

const TODOS_LOCALSTORAGE = 'toDos';

let toDos = [];

function deleteToDo(event) {
  let button = event.target;
  while (!button.classList.contains('delete-button')) {
    button = button.parentNode;
  }
  const li = button.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    console.log(toDo.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
  console.log(cleanToDos);
}

//로컬스토리지에 투두리스트 array를 저장
//자바스크립트 object를 string으로 바꿔준다
function saveToDos() {
  localStorage.setItem(TODOS_LOCALSTORAGE, JSON.stringify(toDos));
}

//투두리스트들을 불러옵니다
function loadToDo() {
  const loadedToDo = localStorage.getItem(TODOS_LOCALSTORAGE);

  //투두리스트가 있는지 검사합니다
  //없다면?
  if (loadedToDo !== null) {
    const parsedToDos = JSON.parse(loadedToDo);

    //여기 toDo는 임의로 지정한 이벤트핸들러의 e함수와 같다.
    //자동으로 toDos 안의 한 요소요소들을 가리킨다.
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

//리스트 생성기
function paintToDo(text) {
  //비어있는 리스트 생성
  const li = document.createElement('li');

  //삭제버튼 생성
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = `<svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
</svg>`;

  //내용물 생성
  const span = document.createElement('span');
  span.innerText = text;

  const newId = toDos.length + 1;

  //리스트에 버튼과 내용물을 자식으로 추가
  li.appendChild(span);
  li.appendChild(deleteButton);

  toDoList.appendChild(li);
  li.classList.add('todoli');
  deleteButton.classList.add('delete-button');
  li.id = newId;

  deleteButton.addEventListener('click', deleteToDo);

  //array에 저장공간 마련
  const toDoObj = {
    text: text,
    id: newId,
  };

  //array에 저장
  toDos.push(toDoObj);

  //array에 저장을 마친 후에, 로컬스토리지에 저장
  saveToDos();
}

//투두리스트를 서브밋 했을 시 일어날 이벤트 함수
function toDoSubmitHandler(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function init() {
  loadToDo();
  toDoForm.addEventListener('submit', toDoSubmitHandler);
}
init();
