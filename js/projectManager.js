import { loadProjects, setLocalStorageProjects } from "./localStorageManager.js";

const projectsArr = [];

function createProject (title) {
    const projectID = crypto.randomUUID();
    
    return { title, projectID }
}

function addProject (title) {
    if (title === "") 
        return;

    projectsArr.push(createProject(title));
    setLocalStorageProjects(JSON.stringify(projectsArr));
} 

function deleteProject (uniqueID) {
    projectsArr.forEach((project, index) => {
        if (project.projectID == uniqueID) {
            projectsArr.splice(index, 1);
        }
    })
}

function getProjectArr () {
    const tempStorage = loadProjects();
    if (tempStorage === 0) {
        addProject('Default');
        setLocalStorageProjects(JSON.stringify(projectsArr));
    } else {
        projectsArr.length = 0;
        JSON.parse(tempStorage).forEach(element => {
            projectsArr.push(element);
        })    
    }
    

    // if (projectsArr.length === 0) {
    //     addProject('Default');
    // }

    return [...projectsArr];
}

export { addProject, deleteProject, getProjectArr }