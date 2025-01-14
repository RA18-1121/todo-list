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
    let list = List();

    const sidebarLoad =  () => {
        sidebar.textContent = "";
        const projectArray = list.getList();
        for(let i = 0; i < projectArray.length; i++)
        {
            const projectImg = document.createElement("img");
            projectImg.src = hashtag;
            const projecttext = document.createElement("div");
            projecttext.textContent = `${projectArray[i].getProjectName()}`
            sidebar.append(projectImg, projecttext);
        }
    }

    sidebarLoad();

    const mainLoad = (project) => {
        main.textContent = "";
        const currentProject = project;
        const todoArray = currentProject.getTodoList();        

        const headerDiv = document.createElement("div");
        headerDiv.classList.add("header");
        const headerName = document.createElement("h1");
        headerName.textContent = `${currentProject.getProjectName()}`;
        const headerEdit = document.createElement("img");
        headerEdit.classList.add("right");
        headerEdit.src = edit;
        const headerDelete = document.createElement("img");
        headerDelete.src = bin;
        headerDiv.append(headerName, headerEdit, headerDelete);
        main.append(headerDiv);

        for(let i = 0; i < todoArray.length; i++)
        {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("unit");
            
            const unitHeader = document.createElement("div");
            unitHeader.classList.add("header");
            const todoName = document.createElement("h2");
            todoName.textContent = `${todoArray[i].getTitle()}`;
            const todoEdit = document.createElement("img");
            todoEdit.classList.add("right");
            todoEdit.src = edit;
            const todoDelete = document.createElement("img");
            todoDelete.src = bin;
            unitHeader.append(todoName, todoEdit, todoDelete);

            const todoDesc = document.createElement("p");
            todoDesc.textContent = `${todoArray[i].getDescription()}`;
            const todoDate = document.createElement("p");
            todoDate.textContent = `Due: ${todoArray[i].getDueDate()}`; 
            const todoPrio = document.createElement("p");
            todoPrio.textContent = `Priority: ${todoArray[i].getPriority()}`;

            const todoCheckDiv = document.createElement("div");
            const checkInput = document.createElement("input");
            checkInput.classList.add("checkbox");
            checkInput.type = "checkbox";
            checkInput.setAttribute("id", `check${i}`);
            const checkLabel = document.createElement("label");
            checkLabel.textContent = "Completed";
            checkLabel.setAttribute("for", `check${i}`);
            todoCheckDiv.append(checkInput, checkLabel);

            todoDiv.append(unitHeader, todoDesc, todoDate, todoPrio, todoCheckDiv);
            main.append(todoDiv);
        }

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
                    if(titleInput.value.length >= 3 && dateInput.value.length >= 1 && priorityInput.value.length >= 1)
                    {
                        const newTodo = Todo(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value);
                        currentProject.addToProject(newTodo);
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

    mainLoad(list.getList()[0]);

    const projectAddButton = document.querySelector("#projectAddButton");
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
})()