import { PubSub } from "../pubsub/pubsub.js"
import { Template } from "./template.js"
import logo from "../assets/logo.png"

export class MenuComponent {
  constructor (projects) {
  this.projects = projects;
  this.menu = document.querySelector(".menu");
  this.logoContainer = document.querySelector(".logo")
  this.logoContainer.append(Template.img(logo))

  this.list = document.querySelector(".project-list");
  this.input = document.querySelector("input[name='add_project']");
  this.form =  document.querySelector(".input")
  this.taskData = document.querySelector(".task-data")
  this.errors = document.querySelector(".menu .errors")
  }
  render() {
    this.list.textContent = ""
    this.projects.forEach(project => {
        this.list.appendChild(Template.menu(project));
    });
  };

  fillProject(project, str="") {
    if (str.length !== 0) {
       this.taskData.textContent = str
       return
     } else if(project.name){
      this.taskData.textContent = project.name[0].toUpperCase() + project.name.slice(1, project.name.length)
     }
  }

  bind() {
    this.menu.addEventListener("click", this.#events.bind(this))
  };

  #events (event) {
    let target = event.target;
    if (target.classList[0] == 'project') {
        PubSub.emit("app:update_project", target.id)
        PubSub.emit("save_last_project", target.id)
        return   
    };

    switch(target.id) {
      case 'new-project':
        this.form.classList.toggle("hidden")
        break;
      case 'add-project':
        const name = this.input.value
        if (name.length > 0 ) {
          PubSub.emit("project:add", name)
          this.render()
          this.input.value = ""
          this.form.classList.toggle("hidden")
          this.classList.add("hidden")
          break
        } else {
          this.errors.classList.remove("hidden")
          this.errors.textContent = "Cannot have an project with empty name"
          break
        }
      
        break;
      case 'remove-project':
        const id = target.previousElementSibling.id
        let res = prompt("Are you sure? This cannot be undone? yes/no", "enter yes or no here")
        if (res === "yes" || res === "y") {
          PubSub.emit("app:update_project", id)
          PubSub.emit("project:destroy", id)
          PubSub.emit("project:last")
          this.list.removeChild(target.parentElement)
          break
        } else {
          break
        }
       
      case 'important':
        PubSub.emit("todos:show_important")
        break
      case 'completed':
        PubSub.emit("todos:show_completed")
        break
      case 'today':
        PubSub.emit("todos:show_today")
        break 
      case 'upcoming':
        PubSub.emit("todos:show_upcoming")
        break           
          
        
    }
  };
}
