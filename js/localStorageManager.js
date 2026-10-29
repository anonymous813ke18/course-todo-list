function loadProjects () {
    if (localStorage.getItem("projects") === null) {
        return 0;
    } else {
        return localStorage.getItem('projects');
    }
}

function setLocalStorageProjects (projectsArrString) {
    if (localStorage.getItem('projects') !== null)
        localStorage.removeItem('projects');

    localStorage.setItem('projects', projectsArrString);
}

function loadTodos () {
    if (localStorage.getItem('todos') === null) {
        return 0;
    } else {
        return localStorage.getItem('todos');
    }
}

function setLocalStorageTodos (todoArrString) {
    if (localStorage.getItem('todos') !== null)
        localStorage.removeItem('todos');

    localStorage.setItem('todos', todoArrString);
}

export { loadProjects, setLocalStorageProjects, loadTodos, setLocalStorageTodos }