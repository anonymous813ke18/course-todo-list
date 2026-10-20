import "./styles.css"
import { loadApplication, createProjectBtn, createTodoCard } from "../js/screenController.js";
import { addProject, getProjectArr } from "../js/projectManager.js";    

function renderApplication () {
    let projectArrCopy = getProjectArr();

    loadApplication();
    projectArrCopy.forEach(project => {
        createProjectBtn(project.title)
        console.log(project);
    })
}

renderApplication();