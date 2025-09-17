import { Project } from "../models/project.js"

export class ProjectsController {
	constructor (id='p1') {
		this.setProject(id)
	};

	new (name) {
		let project = new Project(name)
		project.to_json()
		return project
	};
	
	get index() {
		return Project.all
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

	setProject(id) {
		this.id = id;
		this.project = Project.select(id);
	};
};