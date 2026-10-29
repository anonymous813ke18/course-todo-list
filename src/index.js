import "./styles.css"
import { loadApplication, createProjectBtn, createTodoCard, refreshMainBoard } from "../js/screenController.js";
import { addProject, getProjectArr } from "../js/projectManager.js";  
import { addEventListeners } from "../js/eventListeners.js";  

function renderApplication () {
    loadApplication();
    addEventListeners();
    const projectBtnContainer = document.querySelector('.project-btn-container');
    projectBtnContainer.firstChild.click();
}

renderApplication();