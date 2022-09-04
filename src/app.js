// This array will store items for to=do list
let todoItems = [];

const checkIdExists = (array, id) => array.find((item) => id === item.id);

//  function to store inputs as objects in Array (todoItems)
   
function addToDo (text) {
  const todo = {
      text, 
      checked : false,
      id: Date.now(),
  }
  todoItems.push(todo);
  localStorage.setItem('rememberData', JSON.stringify(todoItems));
  renderTasks(todo);
};

// Deleting items on the Dom using a function
function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
      deleted: true,
      ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  localStorage.setItem('rememberData', JSON.stringify(todoItems));
  renderTasks(todo);
};

// checkmark click eventlistner function
   
function toggleComplete(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTasks(todoItems[index]);
};



  updateTodo(updatedTodo = {}) {
    // Do validation first
    // 1st make sure todo with id exists
    const array = this.items;
    const isIdValid = checkIdExists(array, updatedTodo.id);
    if (!isIdValid) {
      //TODO: Render this feedback;
      console.log(`Todo with id ${updatedTodo.id} not found`);
      return;
    } else {
      this.items[updatedTodo.id] = updatedTodo;
      this.transact();
      //call transact to update dom
    }
  }
  deleteTodo(id = undefined) {
    const isIdValid = checkIdExists(this.items, id);
    if (isIdValid) {
      const array = this.items.splice(id - 1, 1);
      this.items = array;
    }
    this.transact();
  };
  transact() {
    //   TODO: Write data to localStorage
    localStorage.setItem("todos", this.items);
    console.log(this.items);
    // TODO: Update the UI with new data
  };


const myApp = new App();

myApp.addTodo(item);
myApp.addTodo(item2);
// console.log(myApp.todos);
console.log("NEW TODOS");
const updatedItem = {
  id: 1,
  name: "take a long relaxing bath",
  dataCreated: new Date(),
  isComplete: false,
  dueDate: undefined,
};

myApp.updateTodo(updatedItem);
myApp.deleteTodo(1);

// console.log(myApp.todos);
