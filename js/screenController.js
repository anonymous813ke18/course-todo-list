import sidebarSVG from "../assets/images/sidebar.svg";
import { getProjectArr } from "./projectManager.js";

const header = document.querySelector('header');
const sidebar = document.querySelector('.sidebar');
const mainBoard = document.querySelector('.main-board');
const footer = document.querySelector('footer');
const body = document.querySelector('body');

function loadApplication () {
    // Loading Header
    const mainHeading = document.createElement('h1');
    mainHeading.textContent = "TODO APP";
    header.appendChild(mainHeading);

    // Loading Footer
    const footerPara = document.createElement('p');
    footerPara.textContent = '© Example Copyright by Hammad Khan';
    footer.appendChild(footerPara);

    // Loading Sidebar
    const sideBarRow = document.createElement('div');
    sideBarRow.classList.add('sidebar-row');

        // Creating the Main Icon 
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const logoSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    logoSvg.setAttribute('height', '30');
    logoSvg.setAttribute('width', '45');
    logoSvg.setAttribute('viewBox', '44 2.5 50 75');

    const logoHeaderText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    logoHeaderText.setAttribute('x', '10');
    logoHeaderText.setAttribute('y', '55');
    logoHeaderText.setAttribute('font-size', '70');
    logoHeaderText.setAttribute('font-weight', 'bold');
    logoHeaderText.textContent = "HK";

    const logoParaText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    logoParaText.setAttribute('x', '15');
    logoParaText.setAttribute('y', '75');
    logoParaText.setAttribute('font-size', '18.5');
    logoParaText.setAttribute('font-weight', 'bold');
    logoParaText.textContent = 'TODO APP';

    const sidebarToggleBtn = document.createElement('button');
    sidebarToggleBtn.classList.add('menu-btn');

        // Creating the SVG in the toggle button
    const sidebarToggleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sidebarToggleSvg.setAttribute('width', '25');
    sidebarToggleSvg.setAttribute('height', '25');
    sidebarToggleSvg.setAttribute('viewBox', '0 0 30 30');
    sidebarToggleSvg.setAttribute('fill', 'none');
    sidebarToggleSvg.setAttribute('stroke', 'currentColor');
    sidebarToggleSvg.setAttribute('stroke-width', '2');
    sidebarToggleSvg.setAttribute('stroke-linecap', 'round');
    sidebarToggleSvg.setAttribute('stroke-linejoin', 'round');

    const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectangle.setAttribute('x', '6');
    rectangle.setAttribute('y', '7.5');
    rectangle.setAttribute('width', '18');
    rectangle.setAttribute('height', '18');
    rectangle.setAttribute('rx', '2');
    rectangle.setAttribute('ry', '2');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '12');
    line.setAttribute('y1', '8.5');
    line.setAttribute('x2', '12');
    line.setAttribute('y2', '25');

    // Appending the svg in the toggle button
    sidebarToggleSvg.appendChild(rectangle);
    sidebarToggleSvg.appendChild(line);
    sidebarToggleBtn.appendChild(sidebarToggleSvg);

    logoSvg.appendChild(logoHeaderText);
    logoSvg.appendChild(logoParaText);
    iconContainer.appendChild(logoSvg);
    sideBarRow.appendChild(iconContainer);
    sideBarRow.appendChild(sidebarToggleBtn);
    sidebar.appendChild(sideBarRow);

    const addProjectBtn = document.createElement('button');
    addProjectBtn.textContent = 'Add Project';
    addProjectBtn.classList.add('add-project-btn');

    sidebar.appendChild(addProjectBtn);

    const projectBtnContainer = document.createElement('div');
    projectBtnContainer.classList.add('project-btn-container');
    sidebar.appendChild(projectBtnContainer);

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

function createProjectBtn (title) {
    const projectBtnContainer = document.querySelector('.project-btn-container');

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project-btn');
    projectBtn.textContent = title;

    projectBtnContainer.appendChild(projectBtn);
}

function createTodoCard (title, description, dueDate, status, priority, projectID) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const titleHeading = document.createElement('h1');
    titleHeading.classList.add('color-blue');
    titleHeading.textContent = title;
    todoItem.appendChild(titleHeading);

    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = description;
    todoItem.appendChild(descriptionPara);

    const flexRowOne = document.createElement('div');
    flexRowOne.classList.add('flex-row');

    const dueDatePara = document.createElement('p');
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = "Due Date:";
    dueDateSpan.classList.add('color-blue');
    dueDatePara.appendChild(dueDateSpan);
    dueDatePara.textContent = dueDate;
    flexRowOne.appendChild(dueDatePara);

    const statusPara = document.createElement('p');
    const statusSpan = document.createElement('span');
    statusSpan.textContent = "Status:";
    statusSpan.classList.add('color-blue');
    statusPara.appendChild(statusSpan);
    statusPara.textContent = status;
    flexRowOne.appendChild(statusPara);

    todoItem.appendChild(flexRowOne);

    const flexRowTwo = document.createElement('div');
    flexRowTwo.classList.add('flex-row');

    const priorityPara = document.createElement('p');
    priorityPara.classList.add('color-blue');
    priorityPara.textContent = 'Priority:';
    flexRowTwo.appendChild(priorityPara);

    const priorityName = crypto.randomUUID();
    const lowInput = document.createElement('input');
    lowInput.setAttribute('type', 'radio');
    lowInput.setAttribute('id', `low-${priorityName}`);
    lowInput.setAttribute('name', `${priorityName}`);
    lowInput.setAttribute('value', 'low');
    const lowLabel = document.createElement('label');
    lowLabel.setAttribute('for', `low-${priorityName}`);
    lowLabel.textContent = 'Low';
    flexRowTwo.appendChild(lowInput);
    flexRowTwo.appendChild(lowLabel);

    const mediumInput = document.createElement('input');
    mediumInput.setAttribute('type', 'radio');
    mediumInput.setAttribute('id', `medium-${priorityName}`);
    mediumInput.setAttribute('name', `${priorityName}`);
    mediumInput.setAttribute('value', 'medium');
    const mediumLabel = document.createElement('label');
    mediumLabel.setAttribute('for', `medium-${priorityName}`);
    mediumLabel.textContent = 'Medium';
    flexRowTwo.appendChild(mediumInput);
    flexRowTwo.appendChild(mediumLabel);

    const highInput = document.createElement('input');
    highInput.setAttribute('type', 'radio');
    highInput.setAttribute('id', `high-${priorityName}`);
    highInput.setAttribute('name', `${priorityName}`);
    highInput.setAttribute('value', `high`);
    const highLabel = document.createElement('label');
    highLabel.setAttribute('for', `high-${priorityName}`);
    highLabel.textContent = 'High';
    flexRowTwo.appendChild(highInput);
    flexRowTwo.appendChild(highLabel);  
    
    todoItem.appendChild(flexRowTwo);

    const flexRowThree = document.createElement('div');
    flexRowThree.classList.add('flex-row');

    const projectsLabel = document.createElement('label');
    projectsLabel.classList.add('color-blue');
    projectsLabel.setAttribute('for', 'projects');
    projectsLabel.textContent = 'Choose Project:';
    flexRowThree.appendChild(projectsLabel);

    const projectSelect = document.createElement('select');
    projectSelect.setAttribute('name', 'projects');
    projectSelect.setAttribute('id', 'projects');

    getProjectArr().forEach(project => {
        const projectOption = document.createElement('option');
        projectOption.setAttribute('value', `${project.projectID}`);
        projectOption.textContent = project.title;
        projectSelect.appendChild(projectOption);
    });

    flexRowThree.appendChild(projectSelect);
    todoItem.appendChild(flexRowThree);

    const flexRowFour = document.createElement('div');
    flexRowFour.classList.add('flex-row');

    const viewBtn = document.createElement('button');
    viewBtn.classList.add('view-btn');
    viewBtn.textContent = 'View';
    flexRowFour.appendChild(viewBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    flexRowFour.appendChild(removeBtn);

    todoItem.appendChild(flexRowFour);

    mainBoard.appendChild(todoItem);

}

export { loadApplication, createProjectBtn, createTodoCard }