import { createSideBar } from "./sidebar.js";
import { refreshMainBoard, createAddProjectModal } from "./screenController.js"

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
    })

    const addProjectBtn = document.querySelector('.add-project-btn');
    addProjectBtn.addEventListener('click', e => {
        // console.log('check')
        createAddProjectModal();
    })
}

export { addEventListeners }