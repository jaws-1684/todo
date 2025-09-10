export class Todo {
    constructor(title, description, dueDate, priority, notes, checklist, id=crypto.randomUUID()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    build () {
        let container = document.createElement("div");
       
        for (let i of Object.keys(this)) {

            if (i == "id") {
                container.setAttribute("id", this[i]);
                continue 
            }

            let data = document.createElement("p");
            data.textContent = this[i]
            data.setAttribute("class", i);
            container.appendChild(data)
        };
        return container
    }
}

