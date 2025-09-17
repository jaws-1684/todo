import { Todo } from "../models/todo.js"

export class TodosController {
	constructor (projectId='p1', id) {
		this.projectId = projectId
		this.setTodo(id);
	};

	new (data) {
		let todo = new Todo (data, this.projectId)
		todo.to_json()
		return todo
	};
	
	get index() {
		return Todo.all
	};
	
	get show() {
		return this.todo
	};

	destroy() {
		if (this.todo) {
			this.todo.destroy()
		}
	};

	edit(data) {
		this.todo.update(data);
	};

	toogle() {
		this.todo.toogle();
	};

	setTodo(id) {
		this.id = id;
		this.todo = Todo.select(id);
	};
};