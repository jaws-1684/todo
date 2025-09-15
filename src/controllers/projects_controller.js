import { Project } from "../models/project.js"
import { Todo } from "../models/todo.js"

export class ProjectsController {
	constructor (id) {
		this.#createDefaultProject()
		this.setProject(id)
	};

	new (name) {
		return new Project(name)
	};
	
	get index() {
		return this.projects
	};
	
	get show() {
		return this.project
	};

	destroy() {
		if (this.project.name == "default") {
    	throw Error("You cannot delete the default project!");
    };

    this.project.destroy()
	};

	removeTodo(id) {
		this.project.destroyTodo(id);
	};

	createTodo(data) {
		let todo = new Todo(data);
		this.project.addTodo(todo);
	};

	editTodo(id, data) {
		this.project.select(id).update(data);
	}
	toogleTodo(id) {
		this.project.select(id).toogle();
	}

	#createDefaultProject() {
		let defaultProject = new Project("default", '1')
		let todo = new Todo({"title": "default todo"})
    defaultProject.addTodo(todo)
	};

	setProject(id) {
		this.id = id;
		this.project = Project.select(id);
		this.projects = Project.all
	};
};