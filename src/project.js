export class Project {
    constructor(name) {
        this.name = name;
        this.todoes = []; 
    };

    add (todo) {
        this.todoes.push(todo)
    };

    destroy (id) {
        const i = this.todoes.find((element) => element.id == id);
        this.todoes.splice(i, 1);
    }

    rightPanel = document.querySelector(".right-panel");

    render () {
        this.todoes.forEach((todo) => {            
            this.rightPanel.appendChild(todo.build());
        });
    };

    build() {
        const item = document.createElement("li");
            item.textContent = this.name;
        return item;
    }

    //appendToDom(todo) {
    //    this.rightPanel.prependChild(todo.build())
    //}
}

