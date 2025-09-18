import "./styles.css";
import { Extensions } from "./extensions.js"
import { ProjectsController } from "./controllers/projects_controller.js"
import { TodosController } from "./controllers/todos_controller.js"
import { MenuComponent } from "./components/menu.js"
import { TodosComponent } from "./components/todos.js"
import { PubSub } from "./pubsub/pubsub.js"


class App {
    constructor () {
        this.last_project_id = localStorage.getItem("last_project")

        if (this.last_project_id !== null) {
            this.projects_controller = new ProjectsController(this.last_project_id);
            this.todos_controller = new TodosController(this.last_project_id);
        } else {
            this.projects_controller = new ProjectsController();
            this.todos_controller = new TodosController();
        }
        
       

        this.menuComponent = new MenuComponent(this.projects_controller.index, this.projects_controller.show)
        this.todosComponent = new TodosComponent(this.projects_controller.show.todos);
            this.menuComponent.fillProject(this.projects_controller.show)
            this.menuComponent.render()
            this.todosComponent.render()

            this.menuComponent.bind()
            this.todosComponent.bind()  
    };

    init () {   
        let tasks = this.todos_controller.index
        let projects = this.projects_controller.index

        PubSub.subscribe("project:add", (name) => this.projects_controller.new(name));
        PubSub.subscribe("project:destroy", () => this.projects_controller.destroy());
        PubSub.subscribe("app:update_project", (id) => this.#updateProject(id));
        PubSub.subscribe("project:last", () => {
            this.#updateProject(projects.at(-1).id)})
       


        PubSub.subscribe("todos:updated", () => this.#todosUpdated())
        PubSub.subscribe("todos:show_important", () => {
            this.todosComponent.todos = Extensions.highPriority(tasks)
            this.todosComponent.render()
            this.menuComponent.fillProject("", "Important")
        })

        PubSub.subscribe("todos:show_completed", () => {
            this.todosComponent.todos = Extensions.completed(tasks)
            this.todosComponent.render()
            this.menuComponent.fillProject("", "Completed")
        })
        PubSub.subscribe("todos:show_today", () => {
            this.todosComponent.todos = Extensions.today(tasks)
            this.todosComponent.render()
            this.menuComponent.fillProject("", "Today")
        })
        PubSub.subscribe("todos:show_upcoming", () => {
            this.todosComponent.todos = Extensions.upcoming(tasks)
            this.todosComponent.render()
            this.menuComponent.fillProject("", "Upcoming")
        })
        PubSub.subscribe("todo:add", (data) => this.todos_controller.new(data));
        PubSub.subscribe("todo:toogle", (id) => {
            this.todos_controller.setTodo(id); 
            this.todos_controller.toogle()
         });

        PubSub.subscribe("todo:edit", ({id, data}) => {
            this.todos_controller.setTodo(id); 
            this.todos_controller.edit(data)
        });
        PubSub.subscribe("todo:remove", (id) => {
            this.todos_controller.setTodo(id);
            this.todos_controller.destroy()
        });
        PubSub.subscribe("save_last_project", (id) => {
            localStorage.setItem("last_project", id)
        })
    };

    #updateProject(id) {
        this.projects_controller.setProject(id);
        this.menuComponent.currentProject = this.projects_controller.show
        this.menuComponent.fillProject(this.projects_controller.show)

        this.todos_controller.projectId = id;
        this.todosComponent.todos = this.projects_controller.show.todos
        this.todosComponent.render()
    };
    #todosUpdated() {
        this.todosComponent.todos = this.projects_controller.show.todos;
        this.todosComponent.render();
    };
};

let app = new App;
app.init()

