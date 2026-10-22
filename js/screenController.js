// import sidebarSVG from "../assets/images/sidebar.svg";
import { addProject, getProjectArr } from "./projectManager.js";
import { getTodoArr } from "./todoManager.js";
import { createSideBar, createProjectBtn, refreshProjectBtnContainer } from "./sidebar.js";
import { createHeader } from "./header.js";
import { createFooter } from "./footer.js";
import { createAddTodoBtn } from "./addTodoBtn.js";

const mainBoard = document.querySelector('.main-board');

function loadApplication () {
    // Creating Header
    createHeader();

    // Creating Footer
    createFooter();

    // Creating Sidebar
    createSideBar();

    // Creating Add Todo Btn
    createAddTodoBtn();
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

function refreshMainBoard (selectedProjectId) {
    const mainBoard = document.querySelector('.main-board');
    mainBoard.replaceChildren();
    getTodoArr().forEach(todoItem => {
        if (todoItem.projectID === selectedProjectId) {
            createTodoCard(todoItem.title, todoItem.description, todoItem.dueDate, todoItem.status, todoItem.priority, todoItem.projectID);
        }
    })
    
}

function createAddProjectModal () {
    const modalContainer = document.querySelector('.modal-container');

    const projectModal = document.createElement('dialog');
    projectModal.classList.add('project-modal');

    const modalRowOne = document.createElement('div');
    modalRowOne.classList.add('modal-row');

    const projectLabel = document.createElement('label');
    projectLabel.setAttribute('for', 'project-title');
    projectLabel.textContent = 'Project Title:';
    modalRowOne.appendChild(projectLabel);

    const projectInput = document.createElement('input');
    projectInput.setAttribute('type', 'text');
    projectInput.setAttribute('minlength', '1');
    projectInput.setAttribute('maxlength', '20');
    modalRowOne.appendChild(projectInput);

    const modalRowTwo = document.createElement('div');
    modalRowTwo.classList.add('modal-row');

    const closeModal = document.createElement('button');
    closeModal.classList.add('close-modal');
    closeModal.textContent = 'Cancel';
    closeModal.addEventListener('click', e => {
        projectModal.close();
        modalContainer.replaceChildren();
    });
    modalRowTwo.appendChild(closeModal);

    const addProjectBtn = document.createElement('button');
    addProjectBtn.classList.add('add-project');
    addProjectBtn.textContent = 'Add Project';
    addProjectBtn.addEventListener('click', e => {
        addProject(projectInput.value);
        refreshProjectBtnContainer();
        projectModal.close();
        modalContainer.replaceChildren();
    });
    modalRowTwo.appendChild(addProjectBtn);

    projectModal.appendChild(modalRowOne);
    projectModal.appendChild(modalRowTwo);

    modalContainer.appendChild(projectModal);
    projectModal.showModal();
}

export { loadApplication, createProjectBtn, createTodoCard, refreshMainBoard, createAddProjectModal }