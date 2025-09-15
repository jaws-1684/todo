export class Todo {
    constructor (data, id=crypto.randomUUID()) {
        this.id = id;

        this.#set(data)
        this.completed = false;
    };
    update(data) {
        this.#set(data)
    };
    toogle() {
        this.completed ? this.completed = false : this.completed = true 
    }
    #set(data) {
        for (let key of Object.keys(data)) {
            this[key] = data[key]
        };
    }
}

