import "./styles.css";
import {Todo} from "./todos";
import {Project} from "./projects";
import {List} from "./list";
import hashtag from "./img/sidebar/hashtag.svg";
import edit from "./img/main/edit.svg";
import bin from "./img/main/delete.svg";

(function ScreenController(){
    const sidebar = document.querySelector(".project-list");
    const main = document.querySelector(".main");
    const newProjectForm = document.querySelector(".newProjectForm");
    let list = List();

    const projectOne = Project("First");
    list.addToList(projectOne);

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

    const todoOne = Todo("first", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ad modi totam! Ipsum molestiae, illo quis facilis expedita perferendis itaque ducimus impedit! Vel non, quis mollitia excepturi quidem hic sit!", "24/7/25", 4);

    const todoSecond = Todo("second", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ad modi totam! Ipsum molestiae, illo quis facilis expedita perferendis itaque ducimus impedit! Vel non, quis mollitia excepturi quidem hic sit!", "22/1/11", 3);

    projectOne.addToProject(todoOne);
    projectOne.addToProject(todoSecond);

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
    }

    mainLoad(projectOne);

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