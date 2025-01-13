import {Todo} from "./todos";

function Project(name){
    let projectName = name;
    const getProjectName = () => projectName;

    const setProjectName = (name) => projectName = name;

    const todoList = [];
    const getTodoList = () => todoList;

    const addToProject = (todo) => todoList.push(todo);

    const removeFromProject = (title) => {
        for(let i = 0; i < todoList.length; i++)
        {
            if(todoList[i].getTitle() === title)
                delete todoList[i];
        }
    }

    const searchTodo = (title) => {
        for(let i = 0; i < todoList.length; i++)
        {
            if(todoList[i].getTitle() === title)
                return todoList[i];
        }
    }

    return {getProjectName, setProjectName, getTodoList, addToProject, removeFromProject, searchTodo};
}

export {Project};