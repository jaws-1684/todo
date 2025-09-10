import "./styles.css";
import { List } from "./list.js"
import { Todo } from "./todo.js"
import { Project } from "./project.js"

class App {
    constructor() {
        this.projectList = new List();
        this.defaultProject = new Project("default");
        this.projectList.add(this.defaultProject);
    };

    get list() {
        return this.projectList;
    };

    init() {
        let defaultPlan = new Todo("Morning Routine",
            "Start the day with healthy habits",
            "2025-09-11","High",
            "Remember to stretch and hydrate",
            false
        );
        this.addTodo(defaultPlan);

        this.defaultProject.render();
        this.projectList.render();
        this.#bind();
    }
       
    addProject(projectName="newProject") {
        const newProject = new Project(projectName);
        this.projectList.add(newProject);
        this.projectList.prepend(newProject);
    };

    removeProject(projectName) {
        this.projectList.destroy(projectName);
    }

    addTodo (todo, projectName="default") {
        let project = this.projectList.select(projectName);

        if (project) {
            project.add(todo);
        };
    };

    removeTodo (todoID, projectName) {
        let project = this.projectList.select(projectName);
        project.destroy(todoID);
    }

    #domActions (event) {
        let target = event.target;

        switch(target.id) {
            case 'project':
                document.querySelector(".pinput").classList.toggle("hidden")
                break;
            case 'add-project':
                const inp = document.querySelector("input[name='project']");
                this.addProject(inp.value);
                break;
        }  
    }

    #bind(e="main") {
        const element = document.querySelector(e)
        element.addEventListener('click', this.#domActions.bind(this))
    };

}



const todo = new App();
todo.init()

 

