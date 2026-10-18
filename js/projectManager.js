const projectsArr = [];

function createProject (title) {
    const projectID = crypto.randomUUID();
    
    return {
        // Title getter/setter
        get title () {
            return title;
        },
        set title (value) {
            if (value.length < 1 || value.length > 20)
                return;
            title = value;
        },

        // Unique ID getter
        get projectID () {
            return projectID;
        }
    }
}


// function loadProjects () {
//     if (localStorage.getItem("projects") !== null) {
//         projectsArr.length = 0;
//         JSON.parse(localStorage.getItem("projects")).forEach(element => {
//             projectsArr.push(element);
//         });
//     } else {
//         localStorage.setItem("projects", JSON.stringify([createProject("Default")]));
//     }
// }

function addProject (title) {
    projectsArr.push(createProject(title))
} 

// function setLocalStorage () {
//     localStorage.removeItem('projects');
//     localStorage.setItem('projects', JSON.stringify(projectsArr));
// }

function deleteProject (uniqueID) {
    projectsArr.forEach((project, index) => {
        if (project.projectID == uniqueID) {
            projectsArr.splice(index, 1);
        }
    })
}

export { addProject, deleteProject }