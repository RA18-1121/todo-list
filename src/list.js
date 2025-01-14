import {Project} from "./projects";

function List(){
    const projectList = [];

    const defaultProject = Project("Default");
    projectList.push(defaultProject);

    const getList = () => projectList;

    const addToList = (project) => projectList.push(project);

    const removeFromList = (projectName) => {
        for(let i = 0; i < projectList.length; i++)
        {
            if(projectList[i].getProjectName() === projectName && projectName !== "Default")
                delete projectList[i];
        }
    }

    const searchProject = (projectName) => {
        for(let i = 0; i < projectList.length; i++)
        {
            if(projectList[i].getProjectName === projectName)
                delete projectList[i];
        }
    }

    return {getList, addToList, removeFromList, searchProject};
}

export {List};