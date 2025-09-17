import { PubSub } from "../pubsub/pubsub.js"
import { Template } from "./template.js"

export class TodosComponent {
  constructor (todos) {
    this.todos = todos;
    this.errorList = [];

    this.container = document.querySelector(".todos");
    this.list = document.querySelector(".todos-list");
    this.errors = document.querySelector(".errors")
    this.submitBtn = document.getElementById("submit-button")
  };
 
 
  render() {
    this.list.textContent = "";
    if (this.todos.length === 0) {
      this.list.textContent = ""
      let heading = document.createElement("h1")
        heading.textContent = "Nothing here yet!"
      this.list.append(heading)
    }
    if (this.todos.length > 0) {
      this.list.textContent = ""
      this.todos.forEach((todo) => {
      this.list.appendChild(Template.todo(todo));
    });
    }
  };

  bind() {
    this.container.addEventListener("click", this.#events.bind(this))
  };

  #events(event) {
    let form = document.getElementById("todo-form");
    const target = event.target;
    const hiddenField =  document.getElementById("custId")
    const data = this.#buildObject(form)

    if (target.classList[0] === "todo") {
      let e = target.querySelector(".notes")
      if ( e && e.classList[0] === "notes" && e.classList[1] === "hidden") {
        e.classList.remove("hidden")
      } else if (e) {
        e.classList.add("hidden")
      }
      
    }

    switch (target.id) {
      case "new-todo":
        form.reset();
        this.submitBtn.textContent = "Add"
        this.submitBtn.setAttribute("id", "submit")
        form.classList.toggle("hidden");
        break;
      case "submit":
        event.preventDefault();
        this.#formHandler(form, data, "todo:add")        
        break;
      case "edit":
        event.preventDefault();
        const fid = hiddenField.value;
        this.#formHandler(form, data, "todo:edit", fid)
        break
      case "remove-todo":
        const id = target.parentElement.id;
        PubSub.emit("todo:remove", id)
        this.list.removeChild(target.parentElement)
        break;
      case "mark-complete":
        let todo =  target.parentElement.parentElement
        let tid = todo.id
        if (!todo.classList.contains('completed')) {
          PubSub.emit("todo:toogle", tid)
          todo.classList.add("completed")
        } else {
          todo.classList.remove("completed")
          PubSub.emit("todo:toogle", tid)
        }
        break
      case "edit-todo":
          form.classList.toggle("hidden");
          this.submitBtn.textContent = "Apply"
          this.submitBtn.setAttribute("id", "edit")
          const objectTodo = this.todos.find(todo => todo.id === target.parentElement.id)
          this.#populateForm(form, objectTodo)
          hiddenField.value = target.parentElement.id;
          break

    }
  };
  #valid(data) {
    this.errorList = []

    for (const [key, value] of Object.entries(data)) {
      if (value.length === 0) {
        this.errorList.push(key)
      }
    }
    if (this.errorList.length > 0) {
      return false 
    }
    return true
  }

  #buildObject(form) {
    let obj = {};

     Array.from(form.elements).forEach((element) => {
      if (element.name != "" && element.name != "custId") {
        obj[element.name]= element.value
      }
    })
    return obj;
  };
  #populateForm(form, data) {
    Array.from(form.elements).forEach((element) => {
      if (element) {
        element.value = data[element.name]
      }
    })
  };
  #formHandler(form, data, action, id="") {
    if (this.#valid(data)) {
      if (id) {
        PubSub.emit(action, {id, data})
      } else {
        PubSub.emit(action, data)
      }
      
      form.reset();
      form.classList.toggle("hidden");
      PubSub.emit("todos:updated")
      this.errors.textContent = ""
      this.errors.classList.add("hidden")
    } else {
      this.errors.classList.remove("hidden");
      this.errors.textContent = `You should complete ${this.errorList.join(',')}`
    }
  }
}
