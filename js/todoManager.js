import { parse, isBefore, add } from "date-fns";

const todoArr = [];

function CreateTodo (title, description, dueDate, priority, status, projectID) {
    const ID = crypto.randomUUID();

    return {
        // Title getter/setter
        get title () {
            return title;
        },
        set title (value) {
            if (value.length < 1 || value.length > 30)
                return;

            title = value;
        },

        // Description getter/setter
        get description () {
            return description;
        },
        set description (value) {
            if (value.length < 1 || value.length > 150)
                return;
            
            description = value;
        },

        // Due Date getter/setter
        get dueDate () {
            return dueDate;
        },
        set dueDate (value) {
            const parsedDate = parse(value, 'dd-MM-yyyy', new Date());
            if (isBefore(parsedDate, new Date ()))
                return;

            dueDate = value;
        },

        // Priority getter/setter
        get priority () {
            return priority;
        },
        set priority (value) {
            priority = value;
        },

        // Status getter/setter
        get status () {
            return status;
        },
        set status (value) {
            status = value;
        },

        // Project ID getter
        get projectID () {
            return projectID;
        },

        // Unique ID getter
        get ID () {
            return ID;
        },
    }
}

function addTodo (title, description, dueDate, priority) {
    todoArr.push(CreateTodo(title, description, dueDate, priority));
}

function removeTodo (uniqueID) {
    todoArr.forEach((todoItem, index) => {
        if (todoItem.ID === uniqueID)
            todoArr.splice(index, 1);
    })
}

function updateStatus (uniqueID, value) {
    todoArr.forEach(todoItem => {
        if (todoItem.ID === uniqueID)
            todoItem.status = value;
    })
}

export { addTodo, removeTodo, updateStatus }