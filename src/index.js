import "./styles.css";
import { ProjectsController } from "./controllers/projects_controller.js"
import { TodosController } from "./controllers/todos_controller.js"
import { MenuComponent } from "./components/menu.js"
import { TodosComponent } from "./components/todos.js"
import { PubSub } from "./pubsub/pubsub.js"
import { isToday, isThisWeek } from "date-fns";

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
        
       

        this.menu = new MenuComponent(this.projects_controller.index, this.projects_controller.show)
        this.todos = new TodosComponent(this.projects_controller.show.todos);
            this.menu.fillProject(this.projects_controller.show)
            this.menu.render()
            this.todos.render()

            this.menu.bind()
            this.todos.bind()  
    };

    init () {   

        PubSub.subscribe("project:add", (name) => this.projects_controller.new(name));
        PubSub.subscribe("project:destroy", () => this.projects_controller.destroy());
        PubSub.subscribe("app:update_project", (id) => this.#updateProject(id));
        PubSub.subscribe("project:last", () => {
            this.#updateProject(this.projects_controller.index.last().id)})
       


        PubSub.subscribe("todos:updated", () => this.#todosUpdated())
        PubSub.subscribe("todos:show_important", () => {
            this.todos.todos = this.todos_controller.index.where({"priority": "high"})
            this.todos.render()
            this.menu.fillProject("", "Important")
        })

        PubSub.subscribe("todos:show_completed", () => {
            this.todos.todos = this.todos_controller.index.where({"completed": true})
            this.todos.render()
            this.menu.fillProject("", "Completed")
        })
        PubSub.subscribe("todos:show_today", () => {
            this.todos.todos = this.todos_controller.index.filter(todo => {
                return isToday(new Date(todo.year, todo.month, todo.day)) >= 1;
            })
            this.todos.render()
            this.menu.fillProject("", "Today")
        })
        PubSub.subscribe("todos:show_upcoming", () => {
            this.todos.todos = this.todos_controller.index.filter(todo => {
            if (!isToday(new Date(todo.year, todo.month, todo.day)) >= 1) {
            return isThisWeek(new Date(todo.year, todo.month, todo.day))
            };
            })
            this.todos.render()
            this.menu.fillProject("", "Upcoming")
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
        this.menu.currentProject = this.projects_controller.show
        this.menu.fillProject(this.projects_controller.show)

        this.todos_controller.projectId = id;
        this.todos.todos = this.projects_controller.show.todos
        this.todos.render()
    };
    #todosUpdated() {
        this.todos.todos = this.projects_controller.show.todos;
        this.todos.render();
    };
};

let app = new App;
app.init()

