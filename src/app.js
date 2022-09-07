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

// SAVING TODO'S
 function saveTodo(){
  const todoValue = todoInput.ariaValue

  //CHECK IF THE TODO IS EMPTY SHOW ERROR
const isEmpty = todoValue === '';

//CHECK FOR DUPLICATE TODO'S SHOW ERROR
const isDuplicate =
todos.some((todo) => todo.value === todoValue);

if(isEmpty){
  alert("todo's input is empty");
}else{const todo = {
  value : todoValue,
  checked : false,
  //RANDOMIZING EACH TODO COLOR ON LIST
  color : '#' + Math.floor(Math.random()*16777215).toString(16)
}

todos.push(todo)

}
 }


