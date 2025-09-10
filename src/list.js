export class List {
    projects = [];
    leftPanel = document.querySelector(".left-panel")

    get projects() {
        this.projects;
    }
    destroy (name) {
        if (name == "default") {
            throw Error("You cannot delete the default project!");
        };
        const i = this.projects.indexOf(e => e.name === name);
        this.projects.splice(i, 1);
    };

    add (project) {
        this.projects.push(project);
    };

    select (name) {
        return this.projects.find(e => e.name === name);
    };

    render() {
        let container = document.createElement("ul");
        container.setAttribute("class", "project-list");

        this.projects.forEach((project) => {
            container.appendChild(project.build());
        })
        this.leftPanel.appendChild(container)
    };

    prepend (project) {
        const list = document.querySelector(".project-list");
        list.prepend(project.build())
    }
};

