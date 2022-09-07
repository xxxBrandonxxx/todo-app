// SELECTING THE FORM ELEMENTS
const form = document.getElementById('todoform')
const todoInput = document.getElementById('newtodo')

// ARRAY FOR SAVING TODOS
let todos = [];

// FORM SUBMIT PREVENT PAGE FROM REFRESHING ON NORMAL SUBMIT
form.addEventListener('submit', function(event) {
  event.preventDefault();

  saveTodo();
});

//SAVING TODO'S ON THE APP FUNCTION
function saveTodo(){
  const todoValue = todoInput.value

  const todo = {
    value : todoValue,
    checked : false,
    //COLOR GENERATED BY RANDOM FOUND IT ON GOOGLE
    color : '#' + Math.floor(Math.random()*16777215).toString(16)
  };

  todos.push(todo);
}

