export class List {
    projects = [];

    get projects() {
        this.projects;
    }
    delete (name) {
        if (name == "default") {
            throw Error("You cannot delete the default project!");
        };
        const i = this.projects.indexOf(e => e.name === name);
        this.projects.splice(i, 1);
    };

    add (project) {
        this.projects.push(project);
    };

    get (name) {
        return this.projects.find(e => e.name === name);
    };
};

