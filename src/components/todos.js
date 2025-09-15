import { PubSub } from "../pubsub/pubsub.js"
import { DOM } from "../dom.js"

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
    this.todos.forEach((todo) => {
      this.list.appendChild(this.#template(todo));
    });
  };

  bind() {
    this.container.addEventListener("click", this.#events.bind(this))
  };

  #template(todo) {
    const container = DOM.build("div", {"class": "todo"})
      const completeContainer = DOM.build("div", {"class": "mark-wrapper"})
      const completebtn = DOM.build("div", {"id": "mark-complete"})
        completeContainer.append(completebtn)
    container.append(completeContainer)

    let notes;
    for (const [key, value] of Object.entries(todo)) {
      if (key === "id") {
        container.setAttribute("id", value);
        continue;
      }
      const data = DOM.build("p", {"class": key }, value)
      if (key == "notes") {
        data.setAttribute("class", "hidden") 
      }
      container.append(data);
    }

    const deleteBtn = DOM.build("button", {"id": "remove-todo"}, "delete")
    const editBtn = DOM.build("button", {"id": "edit-todo"}, "edit")
    container.append(deleteBtn, editBtn)

    return container;
  };
  #events(event) {
    let form = document.getElementById("todo-form");
    const target = event.target;
    const hiddenField =  document.getElementById("custId")
    const data = this.#buildObject(form)

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
        this.render()
        break;
      case "mark-complete":
        let todo =  target.parentElement.parentElement
        let tid = todo.id

        if (!target.style.cssText) {
          target.style.cssText = "background-color: red"
          todo.style["color"] = "black"
          PubSub.emit("todo:toogle", tid)
        } else {
          target.style.cssText = ""
          target.parentElement.parentElement.style["color"] = ""
          PubSub.emit("todo:toogle", tid)
        }
      case "edit-todo":
          form.classList.toggle("hidden");
          this.submitBtn.textContent = "Apply"
          this.submitBtn.setAttribute("id", "edit")
          const objectTodo = this.todos.find(todo => todo.id === target.parentElement.id)
          this.#populateForm(form, objectTodo)
          hiddenField.value = target.parentElement.id;

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
      console.log(form.elements)
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
      this.render()
      this.errors.textContent = ""
      this.errors.classList.add("hidden")
    } else {
      this.errors.classList.remove("hidden");
      this.errors.textContent = `You should complete ${this.errorList.join(',')}`
    }
  }
}
