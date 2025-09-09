import "./styles.css";
import { List } from "./list.js"
import { Todo } from "./todo.js"
import { Project } from "./project.js"

class App {
    static init() {
        this.projectList = new List();
        this.defaultProject = new Project("default");
        this.projectList.add(this.defaultProject);
    };
    static get list() {
        return this.projectList;
    }

    static addTodo (todo, projectName="default") {
        let project = this.projectList.get(projectName);

        if (project) {
            project.add(todo);
        } else {
            const newProject = new Project(projectName);
            newProject.add(todo);
            this.projectList.add(newProject);
        };
    };
}

const newPlan = new Todo("Buy new stuff", "from iked", "18/20/2028", "low", "no notes", "false");

App.init()
App.addTodo(newPlan)
console.log(App.list)
