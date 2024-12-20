const todoForm = document.querySelector("form")
const todoInput = document.getElementById("todo-input")
const todoListUL = document.getElementById("todo-list")

let allTodosArray = getTodosFromLocalStorage();
updateTodoList();
// console.log(allTodosArray);


todoForm.addEventListener("submit", (event) => {
    event.preventDefault(); //to prevent the page from automatically reloading after every submit
    addTodo();
})

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodosArray.push(todoObject);
        updateTodoList();
        saveTodosToLocalStorage();
        todoInput.value = "";
    }
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoListItem = document.createElement("li")
    const todoText = todo.text;
    todoListItem.className = "todo"; // to set the class name of the li inside out todo list
    todoListItem.innerHTML = `
             <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#000000">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px"
                        viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>
    `;

    const deleteButton = todoListItem.querySelector(".delete-button"); // selects the delete-button class from li(todo) 
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    })

    const checkbox = todoListItem.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodosArray[todoIndex].completed = checkbox.checked;
        saveTodosToLocalStorage();
    })
    checkbox.checked = todo.completed;

    return todoListItem;
}

// updates the todo list with newly created todo item 
function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodosArray.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

function saveTodosToLocalStorage() {
    const todoJson = JSON.stringify(allTodosArray);
    localStorage.setItem("todos", todoJson);
}

function getTodosFromLocalStorage() {
    const todos = localStorage.getItem("todos") || "[]"; // if local storage is empty then create an empty array
    return JSON.parse(todos); // converts stored JSONs into js arrays, and returns them
}

function deleteTodoItem(todoIndex) {
    allTodosArray = allTodosArray.filter((_, i) => i !== todoIndex)
    saveTodosToLocalStorage();
    updateTodoList();
}