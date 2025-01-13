function Todo(title, description, dueDate, priority){
    let todoTitle = title;
    let todoDescription = description;
    let todoDueDate = dueDate;
    let todoPriority = priority;
    let todoChecked = false;

    const getTitle = () => todoTitle;
    const getDescription = () => todoDescription;
    const getDueDate = () => todoDueDate;
    const getPriority = () => todoPriority;
    const getChecked = () => todoChecked;

    const setTitle = (title) => todoTitle = title;
    const setDescription = (description) => todoDescription = description;
    const setDueDate = (date) => todoDueDate = dueDate;
    const setPriority = (priority) => todoPriority = priority;
    const setChecked = (checked) => todoChecked = checked;

    return {getTitle, getDescription, getDueDate, getPriority, getChecked, setTitle, setDescription, setDueDate, setPriority, setChecked};
}

export {Todo};