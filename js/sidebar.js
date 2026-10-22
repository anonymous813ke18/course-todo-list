import { getProjectArr } from "./projectManager.js";

const sidebar = document.querySelector('.sidebar');

function createSideBar () {
    // Loading Sidebar
    const sideBarRow = document.createElement('div');
    sideBarRow.classList.add('sidebar-row');

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

    logoSvg.appendChild(logoHeaderText);
    logoSvg.appendChild(logoParaText);
    iconContainer.appendChild(logoSvg);
    sideBarRow.appendChild(iconContainer);

    sidebar.appendChild(sideBarRow);

    const addProjectBtn = document.createElement('button');
    addProjectBtn.textContent = 'Add Project';
    addProjectBtn.classList.add('add-project-btn');

    sidebar.appendChild(addProjectBtn);

    const projectBtnContainer = document.createElement('div');
    projectBtnContainer.classList.add('project-btn-container');
    sidebar.appendChild(projectBtnContainer);

    refreshProjectBtnContainer();
}

function createProjectBtn (title, projectID) {
    const projectBtnContainer = document.querySelector('.project-btn-container');

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project-btn');
    projectBtn.textContent = title;
    projectBtn.setAttribute('data-projectID', projectID);

    projectBtnContainer.appendChild(projectBtn);
}

function refreshProjectBtnContainer () {
    const projectBtnContainer = document.querySelector('.project-btn-container');
    projectBtnContainer.replaceChildren();
    
    getProjectArr().forEach(project => {
        createProjectBtn(project.title, project.projectID);
    })
}

export { createSideBar, createProjectBtn, refreshProjectBtnContainer }