import { PubSub } from "../pubsub/pubsub.js"
import { DOM } from "../dom.js"

export class MenuComponent {
  constructor (projects) {
  this.projects = projects;
  this.menu = document.querySelector(".menu");
  this.list = document.querySelector(".project-list");
  this.input = document.querySelector("input[name='add_project']");
  this.form =  document.querySelector(".input")
  }
  render() {
    this.list.textContent = ""
    this.projects.forEach(project => {
        this.list.appendChild(this.#template(project));
    });
  };
  bind() {
    this.menu.addEventListener("click", this.#events.bind(this))
  };
 
  #template(project) {
    const item = DOM.build("div", {"class": `${project.name.split('').join('.')}`})

    const container = DOM.build("div", {
      "class": "project",
      "id": project.id
    }, project.name)

    item.append(container)

    if (project.name !== "default") {
      const btn = DOM.build("button", { id: 'remove-project'}, "delete")
      item.append(btn)
    }

    return item;
  };

  #events (event) {
    let target = event.target;

    if (target.classList[0] == 'project') {
        PubSub.emit("app:update", target.id)
        this.render()
        return   
    };

    switch(target.id) {
      case 'new-project':
        this.form.classList.toggle("hidden")
        break;
      case 'add-project':
        const name = this.input.value
        PubSub.emit("project:add", name)

        this.render()
        this.input.value = ""
        this.form.classList.toggle("hidden")
        break;
      case 'remove-project':
        const id = target.previousElementSibling.id
        PubSub.emit("project:destroy", id)
        this.render()
        break
    }
  };
}
