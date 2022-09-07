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
function saveTodo() {
  const todoValue = todoInput.ariaValue

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
      value: todoValue,
      checked: false,

  //RANDOMIZING EACH TODO COLOR ON LIST
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    });

  //CLEAR FIELD AFTER SUBMITTING TODO
    todoInput.value = '';
  }
}

// RENDERING TODO'S ON DOM  
function renderTodos(){

}

