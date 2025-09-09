export class Project {
    constructor(name) {
        this.name = name;
        this.todoes = []; 
    };

    add (todo) {
        this.todoes.push(todo)
    };

    delete (id) {
        const i = this.todoes.find((element) => element.id == id);
        this.todoes.splice(i, 1);
    }
}

