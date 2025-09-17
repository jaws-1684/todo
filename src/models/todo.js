export class Todo {
    constructor (data, projectId, id=crypto.randomUUID(), completed=false) {
        this.id = id;
        this.projectId = projectId;

        this.#set(data)
        this.completed = completed;
        Todo.all.push(this)
    };
    static all = [];
    static select(id) {
        return Todo.all.find(todo => todo.id === id);
    };
    static dependentDestroy(projectId) {
        Todo.all = Todo.all.filter(todo => todo.projectId !== projectId)
        Todo.all[0].to_json()
    };  

    update(data) {
        this.#set(data)
        this.to_json()
    };
   
    toogle() {
        this.completed ? this.completed = false : this.completed = true
        this.to_json()
    }

    destroy() {
        const i = Todo.all.findIndex(todo => todo.id === this.id);
        if (i !== -1) {
            Todo.all.splice(i, 1);
            this.to_json()
        };
    };
     
    
    #set(data) {
        for (let key of Object.keys(data)) {
            this[key] = data[key]
        };
    };
    get day() {
        return Number(this["duedate"].split("-")[2])
    }
    get year() {
        return Number(this["duedate"].split("-")[0])
    }
    get month() {
        return (Number(this["duedate"].split("-")[1]) - 1)
    }
    to_json() {
        if (localStorage) {
            let todos = JSON.stringify(Todo.all)
            localStorage.setItem("todos", todos);
        } else {
        // Too bad, no localStorage for us
        }
    }
    static from_json() {
        let todos = JSON.parse(localStorage.getItem("todos"))
           for (let todo of todos) {
                new Todo(todo, todo["projectId"], todo["id"], todo['completed'])
            }
    };
};

Array.prototype.where = function(hash={}) {
    const key = Object.keys(hash)[0]
    return this.filter(item => item[key] === hash[key])
};

if (localStorage.getItem('projects')) {
    Todo.from_json()
}
//creating the default Todo
if (Todo.all.length === 0) {
    let todo = new Todo({"title": "Todo app project", "description": "finishing the todo app", "duedate": "2030-09-16", "notes": "not so easy huh?"}, 'p1', 't1', true)
    todo.to_json()    
}       
