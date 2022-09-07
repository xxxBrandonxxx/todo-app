// SELECTING THE FORM ELEMENTS
const form = document.getElementById('todoform')
const todoInput = document.getElementById('newtodo')
const todoListElements = document.getElementById('todos-list')

// ARRAY FOR ---SAVING TODOS---
let todos = [];

// FORM SUBMIT PREVENT PAGE FROM REFRESHING ON NORMAL SUBMIT
form.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo();
  renderTodos();
});

// SAVING TODO'S
function saveTodo(){
  const todoValue = todoInput.value

  //ADDING ERRORS
  //CHECK IF THE TODO IS EMPTY SHOW ERROR
  const isEmpty = todoValue === '';

  //CHECK FOR DUPLICATE TODO'S SHOW ERROR
  const isDuplicate =
    todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

  if (isEmpty) {
    alert("todo's input is empty");
  } else if(isDuplicate){
    alert('todo already exists')
  }
  else {    
    todos.push({
      value : todoValue,
      checked : false,

  //RANDOMIZING EACH TODO COLOR ON LIST
      color : '#' + Math.floor(Math.random() * 16777215).toString(16)
    });

  //CLEAR FIELD AFTER SUBMITTING TODO
    todoInput.value = '';
  }
}


function renderTodos(){
//CLEARING ELEMENTS BEFORE A RE-RENDER
  todoListElements.innerHTML = "";

// RENDER TODO'S
  todos.forEach((todo, index) => {
    todoListElements.innerHTML += `
    <div class="todo" id=${index}>
      <i
       class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}";
       style="color : ${todo.color}"
      ></i>
      <p class="">${todo.value}</p>
      <i class="bi bi-pencil-square"></i>
      <i class="bi bi-trash"></i>
  </div>
    `;
  });
}

//CLICK EVENT LISTENER FOR ALL THE TODO'S
todoListElements.addEventListener('click', (event) => {
  const target = event.target;
  const parentEl = target.parentNode;

  if(parentEl.className !== 'todo') return;

  const todo = parentEl;
  const todoId = Number(todo.id);

console.log(todoId);
})