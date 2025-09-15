export class Project { 
    constructor (name, id=crypto.randomUUID()) { 
        this.name = name;
        this.id = id;
        this.todos = [];
        Project.all.push(this); 
    }

    static all = [];
    static select(id) {
        return Project.all.find(project => project.id === id);
    };    
  
    addTodo(todo) {
        this.todos.push(todo);
    };

    destroyTodo(id) {
        const i = this.todos.findIndex(todo => todo.id === id);
        if (i !== -1) {
            this.todos.splice(i, 1);
        }
        
    }

    destroy() {
        const i = Project.all.findIndex(project => project.id === this.id);
        if (i !== -1) {
            Project.all.splice(i, 1);
        }
    };
    select(id) {
        return this.todos.find(todo => todo.id === id);
    };

       
}

