import {Project} from "./projects";

function List(){
    const projectList = [];

    const defaultProject = Project("Default");
    projectList.push(defaultProject);

    const getList = () => projectList;

    const addToList = (project) => projectList.push(project);

    const removeFromList = (project) => {
        for(let i = 0; i < projectList.length; i++)
        {
            if(projectList[i].getProjectName() === project.getProjectName()){
                projectList.splice(i, 1);
                break;
            }
        }
    }

    const searchProject = (projectName) => {
        for(let i = 0; i < projectList.length; i++)
        {
            if(projectList[i].getProjectName() === projectName)
                return projectList[i];
        }
    }

    return {getList, addToList, removeFromList, searchProject};
}

export {List};