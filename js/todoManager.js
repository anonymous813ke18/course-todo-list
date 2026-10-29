import { parse, isBefore, add } from "date-fns";
import { loadTodos, setLocalStorageTodos } from "./localStorageManager.js";

const todoArr = [];

function CreateTodo (title, description, dueDate, priority, status, projectID) {
    const ID = crypto.randomUUID();

    return {
        // // Title getter/setter
        // get title () {
        //     return title;
        // },
        // set title (value) {
        //     if (value.length < 1 || value.length > 30)
        //         return;

        //     title = value;
        // },

        // // Description getter/setter
        // get description () {
        //     return description;
        // },
        // set description (value) {
        //     if (value.length < 1 || value.length > 150)
        //         return;
            
        //     description = value;
        // },

        // // Due Date getter/setter
        // get dueDate () {
        //     return dueDate;
        // },
        // set dueDate (value) {
        //     const parsedDate = parse(value, 'dd-MM-yyyy', new Date());
        //     if (isBefore(parsedDate, new Date ()))
        //         return;

        //     dueDate = value;
        // },

        // // Priority getter/setter
        // get priority () {
        //     return priority;
        // },
        // set priority (value) {
        //     priority = value;
        // },

        // // Status getter/setter
        // get status () {
        //     return status;
        // },
        // set status (value) {
        //     status = value;
        // },

        // // Project ID getter
        // get projectID () {
        //     return projectID;
        // },

        // // Unique ID getter
        // get ID () {
        //     return ID;
        // },

        ID, title, description, dueDate, status, priority, projectID
    }
}

function addTodo (title, description, dueDate, priority, status, projectID) {
    todoArr.push(CreateTodo(title, description, dueDate, priority, status, projectID));
    setLocalStorageTodos(JSON.stringify(todoArr));
}

function removeTodo (uniqueID) {
    todoArr.forEach((todoItem, index) => {
        if (todoItem.ID === uniqueID)
            todoArr.splice(index, 1);
    });
    setLocalStorageTodos(JSON.stringify(todoArr));
}

function updateStatus (uniqueID, value) {
    todoArr.forEach(todoItem => {
        if (todoItem.ID === uniqueID)
            todoItem.status = value;
    });
    setLocalStorageTodos(JSON.stringify(todoArr));
}

function updatePriority (uniqueID, value) {
    todoArr.forEach(todoItem => {
        if (todoItem.ID === uniqueID)
            todoItem.priority = value;
    });
    setLocalStorageTodos(JSON.stringify(todoArr));
}

function updateProject (uniqueID, value) {
    todoArr.forEach(todoItem => {
        if (todoItem.ID === uniqueID)
            todoItem.projectID = value;
    });
    setLocalStorageTodos(JSON.stringify(todoArr));
}

function updateTitle (uniqueID, value) {
    todoArr.forEach(todoItem => {
        if (todoItem.ID === uniqueID)
            todoItem.title = value;
    });
    setLocalStorageTodos(JSON.stringify(todoArr));
}

function updateDescription(uniqueID, value) {
    todoArr.forEach(todoItem => {
        if (todoItem.ID === uniqueID)
            todoItem.description = value;
    });
    setLocalStorageTodos(JSON.stringify(todoArr));
}

function getTodoArr () {
    const tempStorage = loadTodos();
    if (tempStorage !== 0) {
        todoArr.length = 0;
        JSON.parse(tempStorage).forEach(element => {
            todoArr.push(element);
        })  
    } 

    return [...todoArr];
}

export { 
    addTodo, 
    removeTodo, 
    getTodoArr, 
    updateStatus, 
    updatePriority, 
    updateProject, 
    updateTitle, 
    updateDescription 
}