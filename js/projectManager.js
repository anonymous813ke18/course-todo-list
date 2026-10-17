const projectsArr = [];

function createProject (title) {
    const projectID = crypto.randomUUID();
    
    const getProjectID = () => projectID;
    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    return {projectID, getTitle, getProjectID, setTitle}
}


function loadProjects () {
    if (localStorage.getItem("projects") !== null) {
        projectsArr.length = 0;
        JSON.parse(localStorage.getItem("projects")).forEach(element => {
            projectsArr.push(element);
        });
    } else {
        localStorage.setItem("projects", JSON.stringify([createProject("Default")]));
    }
}

function addNewProject (title) {
    projectsArr.push(createProject(title))
    setLocalStorage();
} 

function setLocalStorage () {
    localStorage.removeItem('projects');
    localStorage.setItem('projects', JSON.stringify(projectsArr));
}

function deleteProject (id) {
    projectsArr.forEach((project, index) => {
        if (project.projectID == id) {
            projectsArr.splice(index, 1);
            setLocalStorage();
        }
    })
}

export {loadProjects, addNewProject, deleteProject, projectsArr}