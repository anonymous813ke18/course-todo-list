const body = document.querySelector('body');

function createAddTodoBtn () {
    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('add-todo-btn');

    const plusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    plusSvg.setAttribute('height', '24px');
    plusSvg.setAttribute('viewBox', '0 -960 960 960');
    plusSvg.setAttribute('width', '24px');

    const plusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    plusPath.setAttribute('d', 'M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z');
    plusSvg.appendChild(plusPath);
    addTodoBtn.appendChild(plusSvg);

    body.appendChild(addTodoBtn);
}

export { createAddTodoBtn }