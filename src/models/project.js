import { Todo } from "./todo.js"

export class Project { 
    constructor (name, id=crypto.randomUUID()) { 
        this.name = name;
        this.id = id;
        Project.all.push(this);
    };

    get todos() {
        return Todo.all.filter(todo => todo.projectId === this.id)
    };

    static all = [];
    static select(id) {
        return Project.all.find(project => project.id === id);
    };    
   
    destroy() {
        const i = Project.all.findIndex(project => project.id === this.id);
        if (i !== -1) {
            Project.all.splice(i, 1);
            Todo.dependentDestroy(this.id)
            this.to_json()
        }
       
    };

    to_json() {
        if (localStorage) {
            let projects = JSON.stringify(Project.all)
            localStorage.setItem("projects", projects);
        } else {
        // Too bad, no localStorage for us
        }
    };
    static from_json() {
        let projects = JSON.parse(localStorage.getItem("projects"))
           for (let project of projects) {
                new Project(project["name"], project["id"])
            }
    };
   
};
Array.prototype.last = function ()  {
        return this[this.length - 1]
    }

if (localStorage.getItem('projects')) {
    Project.from_json()
}
//creating the default project
if (Project.all.length === 0) {
    let defaultProject = new Project("default", 'p1')
    defaultProject.to_json()    
}       