import { createSideBar } from "./sidebar.js";
import { refreshMainBoard, createAddProjectModal, createAddTodoModal, createEditTodoTitleModal, createEditTodoDescriptionModal } from "./screenController.js"
import { removeTodo, updateStatus, updatePriority, updateProject, updateTitle } from "./todoManager.js";

const mainContainer = document.querySelector('.container');
const header = document.querySelector('header');
const sidebar = document.querySelector('.sidebar');
const mainboard = document.querySelector('.main-board');
const footer = document.querySelector('footer');
const addProjectBtn = document.querySelector('.add-project-btn');
const projectBtnContainer = document.querySelector('.project-btn-container');
const addTodoBtn = document.querySelector('.add-todo-btn');

function addEventListeners () {
    // Adding event listener to open and close the sidebar
    const menuToggleBtn = document.querySelector('.menu-btn');
    menuToggleBtn.addEventListener('click', e => {
        sidebar.classList.toggle('hidden');
        mainContainer.classList.toggle('hidden-sidebar')
    }); 

    const projectBtnContainer = document.querySelector('.project-btn-container');
    projectBtnContainer.addEventListener('click', e => {
        if (!e.target.classList.contains('project-btn'))
            return;

        Array.from(projectBtnContainer.children).forEach(child => {
            child.classList.remove('selected');
        })
        e.target.classList.add('selected');
        refreshMainBoard(e.target.dataset.projectid);
    });

    const addProjectBtn = document.querySelector('.add-project-btn');
    addProjectBtn.addEventListener('click', e => {
        createAddProjectModal();
    });;

    const addTodoBtn = document.querySelector('.add-todo-btn');
    addTodoBtn.addEventListener('click', e => {
        createAddTodoModal();
    });
    
    const mainBoard = document.querySelector('.main-board');
    mainBoard.addEventListener('click', e => {
        if ((!e.target.classList.contains('todo-card-button'))) 
            return;

        if (e.target.classList.contains('remove-btn')) {
            removeTodo(e.target.dataset.id);
            refreshMainBoard(e.target.dataset.projectid);
        } else if (e.target.classList.contains('title-edit-button')) {
            createEditTodoTitleModal(e.target.dataset.id);
        } else if (e.target.classList.contains('description-edit-btn')) {
            createEditTodoDescriptionModal(e.target.dataset.id);
        }
    });
    mainBoard.addEventListener('change', e => {
        if((!e.target.classList.contains('todo-select')) && (!e.target.classList.contains('todo-radioButton')))
            return;

        if (e.target.id === 'todo-status') {
            updateStatus(e.target.dataset.id, e.target.value)
        } else if (e.target.classList.contains('todo-radioButton')) {
            updatePriority(e.target.dataset.id, e.target.value);
        } else if (e.target.id === 'projects') {
            updateProject(e.target.dataset.id, e.target.value);
            quickRefresh();
        }
    })
}

function quickRefresh () {
    const projectBtnContainer = document.querySelector('.project-btn-container');
    Array.from(projectBtnContainer.children).forEach(child => {
        if (child.classList.contains('selected'))
            child.click();
    });
}

export { addEventListeners, quickRefresh }