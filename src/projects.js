import {Todo} from "./todos";

function Project(name = "NoName"){
    let projectName = name;
    const getProjectName = () => projectName;
    const setProjectName = (name) => projectName = name;

    let todoList = [];
    const getTodoList = () => todoList;

    const addToProject = (todo) => todoList.push(todo);
    const removeFromProject = (title) => todoList = todoList.filter(todo => todo.getTitle() !== title);

    const searchTodo = (title) => todoList.find(todo => todo.getTitle() === title);

    const toJSON = () => ({
        projectName: projectName,
        todoList: todoList.map(todo => todo.toJSON())
    })

    const loadFromJSON = (projectData) => {
        projectName = projectData.projectName;
        todoList = projectData.todoList.map(todoData => {
            const todo = Todo(todoData.title, todoData.desciption, todoData.dueDate, todoData.priority);
            todo.setChecked(todoData.checked);
            return todo;
        })
    }

    return {getProjectName, setProjectName, getTodoList, addToProject, removeFromProject, searchTodo, toJSON, loadFromJSON};
}

export {Project};