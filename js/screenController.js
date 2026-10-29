// import sidebarSVG from "../assets/images/sidebar.svg";
import { addProject, getProjectArr } from "./projectManager.js";
import { addTodo, getTodoArr, updateTitle, updateDescription } from "./todoManager.js";
import { createSideBar, createProjectBtn, refreshProjectBtnContainer } from "./sidebar.js";
import { createHeader } from "./header.js";
import { createFooter } from "./footer.js";
import { createAddTodoBtn } from "./addTodoBtn.js";
import { quickRefresh } from "./eventListeners.js";

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

function createTodoCard (ID, title, description, dueDate, status, priority, projectID) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const flexRowOne = document.createElement('div');
    flexRowOne.classList.add('flex-row');

    const titleHeading = document.createElement('h1');
    titleHeading.classList.add('color-blue');
    titleHeading.textContent = title;
    flexRowOne.appendChild(titleHeading)

    const titleEditButton = document.createElement('button');
    titleEditButton.classList.add('title-edit-button', 'edit-button', 'todo-card-button');
    titleEditButton.setAttribute('data-id', ID);

    const EditSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"
    EditSvg.setAttribute('width', '24');
    EditSvg.setAttribute('viewBox', '0 -960 960 960');
    EditSvg.setAttribute('height', '24');

    const EditSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    EditSvgPath.setAttribute('d', 'M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z');
    EditSvg.appendChild(EditSvgPath);

    titleEditButton.appendChild(EditSvg.cloneNode(true));

    flexRowOne.appendChild(titleEditButton);

    todoItem.appendChild(flexRowOne);

    const flexRowTwo = document.createElement('div');
    flexRowTwo.classList.add('flex-row');

    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = description;
    flexRowTwo.appendChild(descriptionPara);

    const descriptionEditButton = document.createElement('button');
    descriptionEditButton.classList.add('description-edit-btn', 'edit-button', 'todo-card-button');
    descriptionEditButton.setAttribute('data-id', ID);
    descriptionEditButton.appendChild(EditSvg.cloneNode(true));
    flexRowTwo.appendChild(descriptionEditButton);

    todoItem.appendChild(flexRowTwo);

    const flexRowThree = document.createElement('div');
    flexRowThree.classList.add('flex-row');

    const dueDatePara = document.createElement('p');
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = "Due Date: ";
    dueDateSpan.classList.add('color-blue');
    dueDatePara.appendChild(dueDateSpan);
    dueDatePara.append(`${dueDate}`);
    flexRowThree.appendChild(dueDatePara);

    const statusLabel = document.createElement('label');
    statusLabel.classList.add('color-blue');
    statusLabel.textContent = 'Status:';
    statusLabel.setAttribute('for', 'todo-status');
    flexRowThree.appendChild(statusLabel);
    
    const statusSelect = document.createElement('select');
    statusSelect.setAttribute('name', 'todo-status');
    statusSelect.setAttribute('id', 'todo-status');
    statusSelect.classList.add('todo-select')
    statusSelect.setAttribute('data-id', ID);
    statusSelect.setAttribute('data-projectid', projectID);

    const todoStatusOptions = ['Not Started', 'In Progress', 'On Hold', 'Completed'];
    todoStatusOptions.forEach(statusOption => {
        const statusOptionElement = document.createElement('option');
        statusOptionElement.setAttribute('value', `${statusOption}`);
        statusOptionElement.textContent = statusOption;
        // statusOption.split('-').forEach(word => {
        //     statusOptionElement.textContent += `${word.charAt(0).toUpperCase()}${word.slice(1)} `;
        // });

        statusSelect.appendChild(statusOptionElement);
        if (statusOption === status) {
            statusOptionElement.selected = true;
        }
    });

    flexRowThree.appendChild(statusSelect);
    todoItem.appendChild(flexRowThree);

    const flexRowFour = document.createElement('div');
    flexRowFour.classList.add('flex-row');

    const priorityPara = document.createElement('p');
    priorityPara.classList.add('color-blue');
    priorityPara.textContent = 'Priority:';
    flexRowFour.appendChild(priorityPara);

    const priorityName = crypto.randomUUID();
    const radioOptions = ['Low', 'Medium', 'High'];
    radioOptions.forEach(option => {
        const radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('id', `${option}-${priorityName}`);
        radioInput.setAttribute('name', `${priorityName}`);
        radioInput.setAttribute('value', `${option}`);
        radioInput.setAttribute('data-id', ID);
        radioInput.setAttribute('data-projectid', projectID);
        radioInput.classList.add('todo-radioButton')
        const radioLabel = document.createElement('label');
        radioLabel.setAttribute('for', `${option}-${priorityName}`);
        radioLabel.textContent = `${option}`;
        flexRowFour.appendChild(radioInput);
        flexRowFour.appendChild(radioLabel);

        if (priority === option) {
            radioInput.checked = true;
        }
    }); 
    
    todoItem.appendChild(flexRowFour);

    const flexRowFive = document.createElement('div');
    flexRowFive.classList.add('flex-row');

    const projectsLabel = document.createElement('label');
    projectsLabel.classList.add('color-blue');
    projectsLabel.setAttribute('for', 'projects');
    projectsLabel.textContent = 'Choose Project:';
    flexRowFive.appendChild(projectsLabel);

    const projectSelect = document.createElement('select');
    projectSelect.setAttribute('name', 'projects');
    projectSelect.setAttribute('id', 'projects');
    projectSelect.classList.add('todo-select');
    projectSelect.setAttribute('data-id', ID);
    projectSelect.setAttribute('data-projectid', projectID);

    getProjectArr().forEach(project => {
        const projectOption = document.createElement('option');
        projectOption.setAttribute('value', `${project.projectID}`);
        projectOption.textContent = project.title;
        projectSelect.appendChild(projectOption);

        if(project.projectID === projectID)
            projectOption.selected = true;
    });

    flexRowFive.appendChild(projectSelect);
    todoItem.appendChild(flexRowFive);

    const flexRowSix = document.createElement('div');
    flexRowSix.classList.add('flex-row');

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn', 'todo-card-button');
    removeBtn.setAttribute('data-projectid', projectID);
    removeBtn.setAttribute('data-id', ID);
    removeBtn.textContent = 'Remove';
    flexRowSix.appendChild(removeBtn);

    todoItem.appendChild(flexRowSix);

    mainBoard.appendChild(todoItem);
}

function refreshMainBoard (selectedProjectId) {
    const mainBoard = document.querySelector('.main-board');
    mainBoard.replaceChildren();
    getTodoArr().forEach(todoItem => {
        if (todoItem.projectID === selectedProjectId) {
            createTodoCard(todoItem.ID, todoItem.title, todoItem.description, todoItem.dueDate, todoItem.status, todoItem.priority, todoItem.projectID);
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
    projectInput.setAttribute('name', 'project-title');
    projectInput.setAttribute('id', 'project-title');
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

function createAddTodoModal () {
    const modalContainer = document.querySelector('.modal-container');

    const addTodoModal = document.createElement('dialog');
    addTodoModal.classList.add('add-todo-modal');

    // Setting the input to take in the todo title
    const modalRowOne = document.createElement('div');
    modalRowOne.classList.add('modal-row');

    const todoTitleLabel = document.createElement('label');
    todoTitleLabel.setAttribute('for', 'todo-title');
    todoTitleLabel.textContent = 'Title:';
    modalRowOne.appendChild(todoTitleLabel);

    const todoTitleInput = document.createElement('input');
    todoTitleInput.setAttribute('type', 'text');
    todoTitleInput.setAttribute('minlength', '1');
    todoTitleInput.setAttribute('maxlength', '20');
    todoTitleInput.setAttribute('name', 'todo-title');
    todoTitleInput.setAttribute('id', 'todo-title');
    modalRowOne.appendChild(todoTitleInput);

    addTodoModal.appendChild(modalRowOne);

    // Setting the input to take in the todo due date
    const modalRowTwo = document.createElement('div');
    modalRowTwo.classList.add('modal-row');

    const todoDueDateLabel = document.createElement('label');
    todoDueDateLabel.setAttribute('for', 'todo-due-date');
    todoDueDateLabel.textContent = 'Due Date:';
    modalRowTwo.appendChild(todoDueDateLabel);

    const todoDueDateInput = document.createElement('input');
    todoDueDateInput.setAttribute('type', 'date');
    todoDueDateInput.setAttribute('name', 'todo-due-date');
    todoDueDateInput.setAttribute('id', 'todo-due-date');
    modalRowTwo.appendChild(todoDueDateInput);

    addTodoModal.appendChild(modalRowTwo);

    // Setting the input to take in the todo priority
    const modalRowThree = document.createElement('div');
    modalRowThree.classList.add('modal-row');

    const todoPriorityLabel = document.createElement('label');
    todoPriorityLabel.setAttribute('for', 'todo-priority');
    todoPriorityLabel.textContent = 'Set Priority:';
    modalRowThree.appendChild(todoPriorityLabel);

    const todoPrioritySelect = document.createElement('select');
    todoPrioritySelect.setAttribute('name', 'todo-priority');
    todoPrioritySelect.setAttribute('id', 'todo-priority');

    const todoPriorityOptions = ['Low', 'Medium', 'High'];
    todoPriorityOptions.forEach(priorityOption => {
        const priorityOptionElement = document.createElement('option');
        priorityOptionElement.setAttribute('value', `${priorityOption}`);
        priorityOptionElement.textContent = `${priorityOption}`;
        todoPrioritySelect.appendChild(priorityOptionElement);
    });
    modalRowThree.appendChild(todoPrioritySelect);

    addTodoModal.appendChild(modalRowThree);

    // Setting the input to take in the todo status
    const modalRowFour = document.createElement('div');
    modalRowFour.classList.add('modal-row');

    const todoStatusLabel = document.createElement('label');
    todoStatusLabel.setAttribute('for', 'todo-status');
    todoStatusLabel.textContent = 'Select Status:';
    modalRowFour.appendChild(todoStatusLabel);

    const todoStatusSelect = document.createElement('select');
    todoStatusSelect.setAttribute('name', 'todo-status');
    todoStatusSelect.setAttribute('id', 'todo-status');

    const todoStatusOptions = ['Not Started', 'In Progress', 'On Hold', 'Completed'];
    todoStatusOptions.forEach(statusOption => {
        const statusOptionElement = document.createElement('option');
        statusOptionElement.setAttribute('value', `${statusOption}`);
        statusOptionElement.textContent = statusOption;
        todoStatusSelect.appendChild(statusOptionElement);
    });
    modalRowFour.appendChild(todoStatusSelect);

    addTodoModal.appendChild(modalRowFour);

    // Setting the input to take in the todo project
    const modalRowFive = document.createElement('div');
    modalRowFive.classList.add('modal-row');

    const todoProjectLabel = document.createElement('label');
    todoProjectLabel.setAttribute('for', 'todo-project');
    todoProjectLabel.textContent = 'Select Project:'
    modalRowFive.appendChild(todoProjectLabel);

    const todoProjectSelect = document.createElement('select');
    todoProjectSelect.setAttribute('name', 'todo-project');
    todoProjectSelect.setAttribute('id', 'todo-project');

    const todoProjectOptions = getProjectArr();
    todoProjectOptions.forEach(projectOption => {
        const projectOptionElement = document.createElement('option');
        projectOptionElement.setAttribute('value', `${projectOption.projectID}`);
        projectOptionElement.textContent = projectOption.title;
        todoProjectSelect.appendChild(projectOptionElement);
    });
    modalRowFive.appendChild(todoProjectSelect);

    addTodoModal.appendChild(modalRowFive);

    // Setting input to take the todo description
    const modalRowSix = document.createElement('div');
    modalRowSix.classList.add('modal-row');

    const todoDescriptionLabel = document.createElement('label');
    todoDescriptionLabel.setAttribute('for', 'todo-description');
    todoDescriptionLabel.textContent = 'Description:';
    modalRowSix.appendChild(todoDescriptionLabel);

    const todoDescriptionTextArea = document.createElement('textarea');
    todoDescriptionTextArea.setAttribute('name', 'todo-description');
    todoDescriptionTextArea.setAttribute('id', 'todo-description');
    modalRowSix.appendChild(todoDescriptionTextArea);

    addTodoModal.appendChild(modalRowSix);

    // Setting the buttons
    const modalRowSeven = document.createElement('div');
    modalRowSeven.classList.add('modal-row');

    const closeModal = document.createElement('button');
    closeModal.classList.add('close-modal');
    closeModal.textContent = 'Cancel';
    closeModal.addEventListener('click', e => {
        addTodoModal.close();
        modalContainer.replaceChildren();
    });
    modalRowSeven.appendChild(closeModal);

    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('add-todo');
    addTodoBtn.textContent = 'Add Todo';
    addTodoBtn.addEventListener('click', e => {
        addTodo(todoTitleInput.value, todoDescriptionTextArea.value, todoDueDateInput.value, todoPrioritySelect.value, todoStatusSelect.value, todoProjectSelect.value);
        const projectBtnContainer = document.querySelector('.project-btn-container');
        Array.from(projectBtnContainer.children).forEach(child => {
            if(child.dataset.projectid === todoProjectSelect.value){
                child.click();
            }
        });
        addTodoModal.close();
        modalContainer.replaceChildren();
    });
    modalRowSeven.appendChild(addTodoBtn);

    addTodoModal.appendChild(modalRowSeven);

    modalContainer.appendChild(addTodoModal);
    addTodoModal.showModal();
}

function createEditTodoTitleModal (uniqueID) {
    const modalContainer = document.querySelector('.modal-container');

    const todoTitleModal = document.createElement('dialog');
    todoTitleModal.classList.add('todo-title-modal');

    const modalRowOne = document.createElement('div');
    modalRowOne.classList.add('modal-row');

    const todoTitleLabel = document.createElement('label');
    todoTitleLabel.setAttribute('for', 'todo-title');
    todoTitleLabel.textContent = 'New Todo Title:';
    modalRowOne.appendChild(todoTitleLabel);

    const todoTitleInput = document.createElement('input');
    todoTitleInput.setAttribute('type', 'text');
    todoTitleInput.setAttribute('minlength', '1');
    todoTitleInput.setAttribute('maxlength', '20');
    todoTitleInput.setAttribute('name', 'todo-title');
    todoTitleInput.setAttribute('id', 'todo-title');
    modalRowOne.appendChild(todoTitleInput);

    const modalRowTwo = document.createElement('div');
    modalRowTwo.classList.add('modal-row');

    const closeModal = document.createElement('button');
    closeModal.classList.add('close-modal');
    closeModal.textContent = 'Cancel';
    closeModal.addEventListener('click', e => {
        todoTitleModal.close();
        modalContainer.replaceChildren();
    });
    modalRowTwo.appendChild(closeModal);

    const editTodoTitleBtn = document.createElement('button');
    editTodoTitleBtn.classList.add('edit-todo-title');
    editTodoTitleBtn.textContent = 'Save';
    editTodoTitleBtn.addEventListener('click', e => {
        updateTitle(uniqueID, todoTitleInput.value);
        quickRefresh();
        todoTitleModal.close();
        modalContainer.replaceChildren();
    });
    modalRowTwo.appendChild(editTodoTitleBtn);

    todoTitleModal.appendChild(modalRowOne);
    todoTitleModal.appendChild(modalRowTwo);

    modalContainer.appendChild(todoTitleModal);
    todoTitleModal.showModal();
}

function createEditTodoDescriptionModal (uniqueID) {
    const modalContainer = document.querySelector('.modal-container');

    const todoDescriptionModal = document.createElement('dialog');
    todoDescriptionModal.classList.add('todo-description-modal');

    const modalRowOne = document.createElement('div');
    modalRowOne.classList.add('modal-row');

    const todoDescriptionLabel = document.createElement('label');
    todoDescriptionLabel.setAttribute('for', 'todo-description');
    todoDescriptionLabel.textContent = 'New Description:';
    modalRowOne.appendChild(todoDescriptionLabel);

    const todoDescriptionInput = document.createElement('textarea');
    todoDescriptionInput.setAttribute('name', 'todo-description');
    todoDescriptionInput.setAttribute('id', 'todo-description');
    modalRowOne.appendChild(todoDescriptionInput);

    const modalRowTwo = document.createElement('div');
    modalRowTwo.classList.add('modal-row');

    const closeModal = document.createElement('button');
    closeModal.classList.add('close-modal');
    closeModal.textContent = 'Cancel';
    closeModal.addEventListener('click', e => {
        todoDescriptionModal.close();
        modalContainer.replaceChildren();
    });
    modalRowTwo.appendChild(closeModal);

    const editTodoDescrptionBtn = document.createElement('button');
    editTodoDescrptionBtn.classList.add('edit-todo-description');
    editTodoDescrptionBtn.textContent = 'Save';
    editTodoDescrptionBtn.addEventListener('click', e => {
        updateDescription(uniqueID, todoDescriptionInput.value);
        quickRefresh();
        todoDescriptionModal.close();
        modalContainer.replaceChildren();
    });
    modalRowTwo.appendChild(editTodoDescrptionBtn);

    todoDescriptionModal.appendChild(modalRowOne);
    todoDescriptionModal.appendChild(modalRowTwo);

    modalContainer.appendChild(todoDescriptionModal);
    todoDescriptionModal.showModal();
}

export { loadApplication, createProjectBtn, createTodoCard, refreshMainBoard, createAddProjectModal, createAddTodoModal, createEditTodoTitleModal, createEditTodoDescriptionModal }