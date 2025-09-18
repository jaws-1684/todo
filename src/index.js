import "./styles.css";
import { Extensions } from "./extensions.js"
import { ProjectsController } from "./controllers/projects_controller.js"
import { TodosController } from "./controllers/todos_controller.js"
import { MenuComponent } from "./components/menu.js"
import { TodosComponent } from "./components/todos.js"
import { PubSub } from "./pubsub/pubsub.js"


class App {
    constructor () {
        this.lastProjectId = localStorage.getItem("last_project")

        this.#loadControllers(this.lastProjectId)
 
        this.#initializeMenu(this.projects_controller.index, this.projects_controller.show)
        this.#initializeTodos(this.projects_controller.show.todos)
    };

    init () {   
        let tasks = this.todos_controller.index
        let projects = this.projects_controller.index

        this.#subscribeTodosEvents()
        this.#subscribeProjectEvents(projects)
        this.#subscribeFilterEvents(tasks)
    };

    #loadControllers (id){
        if (id !== null) {
            this.projects_controller = new ProjectsController(id);
            this.todos_controller = new TodosController(id);
        } 
        else {
            this.projects_controller = new ProjectsController();
            this.todos_controller = new TodosController();
        }
    };
    #initializeMenu (projects, project) {
        this.menuComponent = new MenuComponent(projects);
        this.menuComponent.fillProject(project)
        this.menuComponent.render()
        this.menuComponent.bind()
    }

    #initializeTodos (todos) {
        this.todosComponent = new TodosComponent(todos);
        this.todosComponent.render()
        this.todosComponent.bind()  
    }
    #subscribeFilterEvents (tasks) {
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
    }
    #subscribeTodosEvents () {
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
        PubSub.subscribe("todos:updated", () => this.#todosUpdated())
    }
    #subscribeProjectEvents (projects) {
        PubSub.subscribe("project:add", (name) => this.projects_controller.new(name));
        PubSub.subscribe("project:destroy", () => this.projects_controller.destroy());
        PubSub.subscribe("app:update_project", (id) => this.#updateProject(id));
        PubSub.subscribe("project:last", () => {
            this.#updateProject(projects.at(-1).id)})
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

