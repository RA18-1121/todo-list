import "./styles.css";
import {Todo} from "./todos";
import {Project} from "./projects";
import {List} from "./list";
import plus from "./img/sidebar/plus.svg";
import hashtag from "./img/sidebar/hashtag.svg";
import edit from "./img/main/edit.svg";
import bin from "./img/main/delete.svg";

(function ScreenController(){
    const sidebar = document.querySelector(".project-list");
    const main = document.querySelector(".main");
    const newProjectForm = document.querySelector(".newProjectForm");
    const projectAddButton = document.querySelector("#projectAddButton");
    let list = List();

    projectAddButton.addEventListener("click", () => {
        if (!document.querySelector("#newProjectName")){
            const projectLabel = document.createElement("label");
            projectLabel.textContent = "Project Name: ";
            projectLabel.setAttribute("for", "newProjectName");
            const projectInput = document.createElement("input");
            projectInput.type = "text";
            projectInput.id = "newProjectName";

            const formSubmitButton = document.createElement("button");
            formSubmitButton.id = "formSubmitButton";
            formSubmitButton.textContent = "Add Project";
            formSubmitButton.addEventListener("click", () => {
                if(projectInput.value.length >= 3){
                    const newProject = Project(projectInput.value);
                    list.addToList(newProject);
                    sidebarLoad();
                    newProjectForm.textContent = "";
                    mainLoad(newProject);
                }
                else{
                    alert("Project name must be minimum 3 characters");
                }
            })

            newProjectForm.append(projectLabel, projectInput, formSubmitButton);
        }  
    })

    const sidebarLoad =  () => {
        sidebar.textContent = "";
        const projectArray = list.getList();
        for(let i = 0; i < projectArray.length; i++)
        {
            const projectImg = document.createElement("img");
            projectImg.src = hashtag;

            const projectText = document.createElement("div");
            projectText.classList.add("projectDivText");
            projectText.setAttribute("id", projectArray[i].getProjectName());
            projectText.addEventListener("click", (event) =>  mainLoad(list.searchProject(event.target.getAttribute("id"))))

            projectText.textContent = `${projectArray[i].getProjectName()}`
            sidebar.append(projectImg, projectText);
        }
    }

    const mainLoad = (project) => {
        main.textContent = "";
        let currentProject = project;
        const todoArray = currentProject.getTodoList();        

        const headerDiv = document.createElement("div");
        headerDiv.classList.add("header");
        const headerName = document.createElement("h1");
        headerName.textContent = `${currentProject.getProjectName()}`;

        const headerEdit = document.createElement("img");
        headerEdit.classList.add("right");
        headerEdit.setAttribute("id", "editProjectButton");
        headerEdit.src = edit;

        headerEdit.addEventListener("click", () => {
            if(!document.querySelector("#newName")){
                const editProjectDiv = document.createElement("div");
                editProjectDiv.classList.add("editProjectDiv");
                const nameLabel = document.createElement("label");
                nameLabel.setAttribute("for", "newName");
                nameLabel.textContent = "Project Name:";
                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.setAttribute("id", "newName");
                const nameButton = document.createElement("button");
                nameButton.setAttribute("id", "nameButton");
                nameButton.textContent = "Change Name";

                nameButton.addEventListener("click", () => {
                    if(nameInput.value.length >= 3)
                    {
                        const projectDiv = document.querySelector(`#${currentProject.getProjectName()}`);
                        projectDiv.setAttribute("id", nameInput.value);
                        currentProject.setProjectName(nameInput.value);
                        list.saveToStorage();
                        sidebarLoad();
                        mainLoad(currentProject);
                    }
                    else
                        alert("Project name must be minimum 3 characters");
                })
                editProjectDiv.append(nameLabel, nameInput, nameButton);
                headerDiv.parentNode.insertBefore(editProjectDiv, headerDiv.nextSibling);
                }
            })
        
        const headerDelete = document.createElement("img");
        headerDelete.setAttribute("id", "projectDeleteButton");
        headerDelete.src = bin;

        headerDelete.addEventListener("click", () => {
            if(list.getList().length > 1)
            {
                list.removeFromList(currentProject);
                sidebarLoad();
                mainLoad(list.getList()[0]);
            }
            else
                alert("Cannot have less than 1 projects.")
        })

        headerDiv.append(headerName, headerEdit, headerDelete);
        main.append(headerDiv);

        todoArray.forEach((todo, index) => {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("unit");
            todoDiv.setAttribute("id", todoArray[index].getTitle());
            
            const unitHeader = document.createElement("div");
            unitHeader.classList.add("header");
            const todoName = document.createElement("h2");
            todoName.textContent = `${todoArray[index].getTitle()}`;

            const todoEdit = document.createElement("img");
            todoEdit.classList.add("right");
            todoEdit.setAttribute("id", "todoEditButton");
            todoEdit.src = edit;

            todoEdit.addEventListener("click", (event) => {
                if(!document.querySelector("#editTodoTitle")){
                    const editTodoForm = document.createElement("form");
                    editTodoForm.classList.add("editTodoForm");                    
    
                    const titleFormDiv = document.createElement("div");
                    const titleLabel = document.createElement("label");
                    titleLabel.setAttribute("for", "editTodoTitle");
                    titleLabel.textContent = "Title:";
                    const titleInput = document.createElement("input");
                    titleInput.type = "text";
                    titleInput.setAttribute("id", "editTodoTitle");
                    titleFormDiv.append(titleLabel, titleInput);
    
                    const descriptionFormDiv = document.createElement("div");
                    const descriptionLabel = document.createElement("label");
                    descriptionLabel.setAttribute("for", "editTodoDescription");
                    descriptionLabel.textContent = "Description:";
                    const descriptionInput = document.createElement("textarea");
                    descriptionInput.setAttribute("id", "editTodoDescription");
                    descriptionFormDiv.append(descriptionLabel, descriptionInput);
    
                    const dateFormDiv = document.createElement("div");
                    const dateLabel = document.createElement("label");
                    dateLabel.setAttribute("for", "editTodoDate");
                    dateLabel.textContent = "Due Date:";
                    const dateInput = document.createElement("input");
                    dateInput.type = "text";
                    dateInput.setAttribute("id", "editTodoDate");
                    dateFormDiv.append(dateLabel, dateInput);
    
                    const priorityFormDiv = document.createElement("div");
                    const priorityLabel = document.createElement("label");
                    priorityLabel.setAttribute("for", "editTodoPriority");
                    priorityLabel.textContent = "Priority:";
                    const priorityInput = document.createElement("input");
                    priorityInput.type = "text";
                    priorityInput.setAttribute("id", "editTodoPriority");
                    priorityFormDiv.append(priorityLabel, priorityInput);
    
                    const formButton = document.createElement("button");
                    formButton.textContent = "Edit Todo";
                    formButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        const foundTodo =  currentProject.searchTodo(event.target.parentNode.parentNode.getAttribute("id"));
                        if(titleInput.value.length >= 1){
                            foundTodo.setTitle(titleInput.value);
                            event.target.parentNode.parentNode.setAttribute("id", titleInput.value);
                        }
                        if(descriptionInput.value.length >= 1)
                            foundTodo.setDescription(descriptionInput.value);
                        if(dateInput.value.length >= 1)
                            foundTodo.setDueDate(dateInput.value);
                        if(priorityInput.value.length >= 1)
                            foundTodo.setPriority(priorityInput.value);
                        list.saveToStorage();
                        mainLoad(currentProject);
                    })
    
                    editTodoForm.append(titleFormDiv, descriptionFormDiv, dateFormDiv, priorityFormDiv, formButton);
                    event.target.parentNode.parentNode.appendChild(editTodoForm);
                    }
            })

            const todoDelete = document.createElement("img");
            todoDelete.setAttribute("id", "todoDeleteButton");
            todoDelete.src = bin;

            todoDelete.addEventListener("click", (event) => { 
                currentProject.removeFromProject(event.target.parentNode.parentNode.getAttribute("id"));
                list.saveToStorage();
                mainLoad(currentProject);
            })

            unitHeader.append(todoName, todoEdit, todoDelete);

            const todoDesc = document.createElement("p");
            todoDesc.textContent = `${todoArray[index].getDescription()}`;
            todoDesc.style.fontStyle = "italic";
            const todoDate = document.createElement("p");
            todoDate.textContent = `Due: ${todoArray[index].getDueDate()}`; 
            const todoPrio = document.createElement("p");
            todoPrio.textContent = `Priority: ${todoArray[index].getPriority()}`;

            const todoCheckDiv = document.createElement("div");

            const checkInput = document.createElement("input");
            checkInput.classList.add("checkbox");
            checkInput.type = "checkbox";
            checkInput.setAttribute("id", `check${index}`);
            checkInput.checked = todo.getChecked();

            checkInput.addEventListener("click", (event) => {
                todo.setChecked(event.target.checked);
                list.saveToStorage();
            })

            const checkLabel = document.createElement("label");
            checkLabel.textContent = "Completed";
            checkLabel.setAttribute("for", `check${index}`);
            todoCheckDiv.append(checkInput, checkLabel);

            todoDiv.append(unitHeader, todoDesc, todoDate, todoPrio, todoCheckDiv);
            main.append(todoDiv);
        })
        

        const newTodoDiv = document.createElement("div");

        const newTodoButton = document.createElement("img");
        newTodoButton.setAttribute("id", "newTodoButton");
        newTodoButton.src = plus;
        newTodoDiv.classList.add("newTodoDiv");
        newTodoButton.addEventListener("click", () => {
            if(!document.querySelector("#newTodoTitle")){
                const newTodoForm = document.createElement("form");

                const titleFormDiv = document.createElement("div");
                const titleLabel = document.createElement("label");
                titleLabel.setAttribute("for", "newTodoTitle");
                titleLabel.textContent = "Title:";
                const titleInput = document.createElement("input");
                titleInput.type = "text";
                titleInput.setAttribute("id", "newTodoTitle");
                titleFormDiv.append(titleLabel, titleInput);

                const descriptionFormDiv = document.createElement("div");
                const descriptionLabel = document.createElement("label");
                descriptionLabel.setAttribute("for", "newTodoDescription");
                descriptionLabel.textContent = "Description:";
                const descriptionInput = document.createElement("textarea");
                descriptionInput.setAttribute("id", "newTodoDescription");
                descriptionFormDiv.append(descriptionLabel, descriptionInput);

                const dateFormDiv = document.createElement("div");
                const dateLabel = document.createElement("label");
                dateLabel.setAttribute("for", "newTodoDate");
                dateLabel.textContent = "Due Date:";
                const dateInput = document.createElement("input");
                dateInput.type = "text";
                dateInput.setAttribute("id", "newTodoDate");
                dateFormDiv.append(dateLabel, dateInput);

                const priorityFormDiv = document.createElement("div");
                const priorityLabel = document.createElement("label");
                priorityLabel.setAttribute("for", "newTodoPriority");
                priorityLabel.textContent = "Priority:";
                const priorityInput = document.createElement("input");
                priorityInput.type = "text";
                priorityInput.setAttribute("id", "newTodoPriority");
                priorityFormDiv.append(priorityLabel, priorityInput);

                const formButton = document.createElement("button");
                formButton.textContent = "Create Todo";
                formButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    if(titleInput.value.length >= 1 && dateInput.value.length >= 1 && priorityInput.value.length >= 1)
                    {
                        const newTodo = Todo(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value);
                        currentProject.addToProject(newTodo);
                        list.saveToStorage();
                        mainLoad(currentProject);
                    }
                })

                newTodoForm.append(titleFormDiv, descriptionFormDiv, dateFormDiv, priorityFormDiv, formButton);
                main.append(newTodoForm);
                }
        })

        const newTodoText = document.createElement("p");
        newTodoText.textContent = "Add Todo";
        newTodoDiv.append(newTodoButton, newTodoText);
        main.append(newTodoDiv);

    }

    sidebarLoad();
    mainLoad(list.getList()[0]);
})()