import "./styles.css";
import { ProjectsController } from "./controllers/projects_controller.js"
import { MenuComponent } from "./components/menu.js"
import { TodosComponent } from "./components/todos.js"
import { PubSub } from "./pubsub/pubsub.js"

class App {
    constructor () {
        this.controller = new ProjectsController('1');

        this.menu = new MenuComponent(this.controller.index)
        this.todos = new TodosComponent(this.controller.show.todos);
            this.menu.render()
            this.todos.render()

            this.menu.bind()
            this.todos.bind()
    };

    init () {   

        PubSub.subscribe("project:add", (name) => this.controller.new(name));
        PubSub.subscribe("project:destroy", () => this.controller.destroy());
        PubSub.subscribe("app:update", (id) => this.update(id));

        PubSub.subscribe("todo:add", (data) => this.controller.createTodo(data));
        PubSub.subscribe("todo:toogle", (id) => this.controller.toogleTodo(id));
        PubSub.subscribe("todo:edit", ({id, data}) => this.controller.editTodo(id, data));
        PubSub.subscribe("todo:remove", (id) => this.controller.removeTodo(id));
    };

    update(id) {
        this.controller.setProject(id);
        this.todos.todos = this.controller.show.todos;
        this.todos.render()
    };
}

let app = new App;
app.init()

