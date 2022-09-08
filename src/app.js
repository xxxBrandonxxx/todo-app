// SELECTING THE FORM ELEMENTS
const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todoListElements = document.getElementById('todos-list');
const notificationElement = document.querySelector('.notification')
const dueDate = document.getElementById('DueDate')

//DUE DATE
todaysDate = new Date().toISOString().split('T');
dueDate.min = todaysDate[0]

// variables ---SAVING TODOS---
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

//FIRST RENDER
renderTodos();

// FORM SUBMIT PREVENT PAGE FROM REFRESHING ON NORMAL SUBMIT
form.addEventListener('submit', function (event) {
  event.preventDefault();
  saveTodo();
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos))
});

// SAVING TODO'S
function saveTodo() {
  const todoValue = todoInput.value

  //ADDING ERRORS
  //CHECK IF THE TODO IS EMPTY SHOW ERROR
  const isEmpty = todoValue === '';
  const isDateInPast = dueDate.value < todaysDate[0];

  if (isDateInPast) {
    showNotification("Please select a valid date");
    return
  }

  //CHECK FOR DUPLICATE TODO'S SHOW ERROR
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

  if (isEmpty) {
    showNotification("todo's input is empty");
  }
  else if (isDuplicate) {
    showNotification('todo already exists')
  }
  else {
    if (EditTodoId >= 0) {
      //UPDATE THE EDITED TODO
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === EditTodoId ? todoValue : todo.value
      }));
      EditTodoId = -1;
    }
    else {
      todos.push({
        value: todoValue,
        checked: false,
        date: dueDate.value,

        //RANDOMIZING EACH TODO COLOR ON LIST
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });
    }

    //CLEAR FIELD AFTER SUBMITTING TODO
    this.resetInputs();
  }
};

function resetInputs() {
  todoInput.value = '';
  dueDate.value = ''
}

function renderTodos() {
  //CLEARING ELEMENTS BEFORE A RE-RENDER
  todoListElements.innerHTML = "";

  // RENDER TODO'S
  todos.forEach((todo, index) => {
    todoListElements.innerHTML += `
    <div class="todo" id=${index}>
      <i
       class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}";
       style="color : ${todo.color}"
       data-action="check"
      ></i>
      <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
      <span>${todo.date}</span>
      <i class="bi bi-pencil-square" data-action="edit"></i>
      <i class="bi bi-trash" data-action="delete"></i>
  </div>
    `;
  });
}

//CLICK EVENT LISTENER FOR ALL THE TODO'S
todoListElements.addEventListener('click', (event) => {
  const target = event.target;
  const parentEl = target.parentNode;
  if (parentEl.className !== 'todo') return;

  //TODO ID
  const todo = parentEl;
  const todoId = Number(todo.id);

  // TARGET ACTION  
  const action = target.dataset.action
  action === "check" && checkTodo(todoId);
  action === "edit" && editTodo(todoId);
  action === "delete" && deleteTodo(todoId);
});

//CHECK A TODO (SELECTING)
function checkTodo(todoId) {
  todos = todos.map((todo, index) =>
  ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked
  }));
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos))
}

//EDIT A TODO
function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  dueDate.value = todos[todoId].date;
  EditTodoId = todoId;
}

//DELETING TODO
function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  //RE-RENDER TODO'S
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos))
}

// SHOW NOTIFICATION ERROR ON DOM
function showNotification(msg) {
  //  CHANGE THE MESSAGE
  notificationElement.innerHTML = msg;
  //  NOTIFICATION ENTER
  notificationElement.classList.add('notif-enter');
  // REMOVE NOTIFICATION AFTER 2 SEC
  setTimeout(() => {
    notificationElement.classList.remove('notif-enter')
  }, 2000)
}