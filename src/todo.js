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
}

