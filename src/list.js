import {Project} from "./projects";

function List(){
    let projectList = [];

    const saveToStorage = () => localStorage.setItem("listData", JSON.stringify(projectList.map(project => project.toJSON())));

    const loadFromStorage = () => {
        const storedDate = localStorage.getItem("listData");
        if(storedDate){
            const storedList = JSON.parse(storedDate);
            projectList = storedList.map(storedProject => {
                const project = Project(storedProject.projectName);
                project.loadFromJSON(storedProject);
                return project;
            })
        }
        else{
            const defaultProject = Project("Default");
            projectList.push(defaultProject);
            saveToStorage();
        }
    }
    loadFromStorage();

    const getList = () => projectList;

    const addToList = (project) => {
        projectList.push(project);
        saveToStorage();
    }

    const removeFromList = (project) => {
        projectList = projectList.filter(p => p.getProjectName() !== project.getProjectName());
        saveToStorage();
    }

    const searchProject = (projectName) => projectList.find(project => project.getProjectName() === projectName);

    return {saveToStorage, loadFromStorage, getList, addToList, removeFromList, searchProject};
}

export {List};