// TODO: Get input from UI
const item = {
  name: "create todo app",
  dataCreated: new Date(),
  isComplete: false,
  dueDate: undefined,
};
const item2 = {
  name: "take a bath",
  dataCreated: new Date(),
  isComplete: false,
  dueDate: undefined,
};

const checkIdExists = (array, id) => array.find((item) => id === item.id);

class App {
  // TODO ADD CONSTRUCTOR TO READ LOCAL STORAGE
  items = [];
  constructor() {}
  // CRUD
  addTodo(newTodo = {}) {
    const _newTodo = { ...newTodo, id: this.items.length };
    this.items.push(_newTodo);
  }
  get todos() {
    // Read local storage
    return this.items;
  }
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
  }
  transact() {
    //   TODO: Write data to localStorage
    localStorage.setItem("todos", this.items);
    console.log(this.items);
    // TODO: Update the UI with new data
  }
}

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
