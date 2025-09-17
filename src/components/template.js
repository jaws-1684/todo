import { DOM } from "../dom.js"

export const Template = (() => {
  const todo = (todo) => {
    const container = DOM.build("div", {"class": "todo"})
      const completeContainer = DOM.build("div", {"class": "mark-wrapper"})
      const completebtn = DOM.build("div", {"id": "mark-complete"})
        completeContainer.append(completebtn)
    container.append(completeContainer)

    let notes;
    for (const [key, value] of Object.entries(todo)) {
      if (key === "projectId" || key === "priority") {
        continue
      }
      if (key === "completed") { 
        value ? container.classList.add("completed") : ""
        continue
      }
      if (key === "id") {
        container.setAttribute("id", value);
        continue;
      }
      const data = DOM.build("div", {"class": key }, value)
      if (key == "notes") {
        data.setAttribute("class", `${key} hidden`) 
      }
      container.append(data);
    }

    const deleteBtn = DOM.build("button", {"id": "remove-todo"})
    
    const bin = svg('<svg xmlns="http://www.w3.org/2000/svg" class="trash-bin" viewBox="0 0 24 24"><g fill="red"><path d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877Z"/><path fill-rule="evenodd" d="M9.425 11.482c.413-.044.78.273.821.707l.5 5.263c.041.433-.26.82-.671.864c-.412.043-.78-.273-.821-.707l-.5-5.263c-.041-.434.26-.821.671-.864Zm5.15 0c.412.043.713.43.671.864l-.5 5.263c-.04.434-.408.75-.82.707c-.413-.044-.713-.43-.672-.864l.5-5.264c.041-.433.409-.75.82-.707Z" clip-rule="evenodd"/><path d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886Z" opacity=".5"/></g></svg>')
    deleteBtn.prepend(bin)

    const editBtn = DOM.build("button", {"id": "edit-todo"})
    const edit = svg('<svg xmlns="http://www.w3.org/2000/svg" class="edit" viewBox="0 0 1025 1023" fill="green"><path d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z"/></svg>')
    editBtn.prepend(edit)
    container.append(deleteBtn, editBtn)

    return container;
  };
  const menu = (project) => {
    let name = project.name.includes(" ") ? `${project.name.split('').join('.')}` : project.name
    const item = DOM.build("div", {"class": `project-container project-${name}`})
    let ico = svg('<svg xmlns="http://www.w3.org/2000/svg" class="project-ico" width="20" height="20" viewBox="0 0 16 16"><path fill="#000000" d="M4.75 7a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM5 4.75A.75.75 0 0 1 5.75 4h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 5 4.75ZM6.75 10a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"/><path fill="#000000" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Z"/></svg>')
   

    const container = DOM.build("div", {
      "class": "project",
      "id": project.id
    }, project.name)
    container.append(ico)
    item.append(container)

    if (project.name !== "default") {
      const btn = DOM.build("button", { id: 'remove-project', style: 'border: 1px solid lightgray; font-size: 12px'}, "Delete Project")
      item.append(btn)
    }

    return item;
  };
  const img = (data) => {
    let e = document.createElement("img")
    e.setAttribute('src', data)
    return e;
  }
  const svg = (data) => {
    const svg = document.createElement("svg")
    svg.innerHTML = data
    return svg
  }
  return { todo, menu, img }
})()
