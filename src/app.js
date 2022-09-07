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



const form = document.querySelector('.todoForm');

// Added event listener for form submit, and added some functionality to remove any white-space if left in the input field
form.addEventListener('submit', event => {
    event.preventDefault();                 // Prevent form from trying to submit to server
    const input = document.querySelector('.todoInput');
    const text = input.value.trim();
    if (text !== '') {
        addToDo(text);
        input.value = '';
        input.focus();
    }
});

function renderTasks(todo) {
    const list = document.querySelector('.todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    if (todo.deleted) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = '';
        return;
    }
    const isChecked = todo.checked ? 'completed': '';
    const liNode = document.createElement('li');
    liNode.setAttribute('class', `todo-item ${isChecked}`);
    liNode.setAttribute('data-key', todo.id);
    liNode.innerHTML = `
    <input id="${todo.id}" type="checkbox" />
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href=#delete-icon"></use></svg>
    </button>
    `;
    // If item is in DOM already, either replace it so that no duplication occures or append to end of list
    if (item) {
        list.replaceChild(liNode, item);
    } else {
        list.append(liNode);
    }
}

// Listen for and apply checkmark as well as delete button listener

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleComplete(itemKey);
    }
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

// Listener to Access LocalStorage and update the DOM if necessary
document.addEventListener('DOMContentLoaded', () => {
    const loadData = localStorage.getItem('rememberData');
    if (loadData) {
        todoItems = JSON.parse(loadData);
        todoItems.forEach (r => {
            renderTasks(r);
        });
    }
});