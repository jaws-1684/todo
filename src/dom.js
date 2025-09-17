export class DOM {
	static build(tag, attr={}, content="") {
		let element = document.createElement(tag);
		for (const [key, value] of Object.entries(attr)) {
			element.setAttribute(key, value);
		};

		if (content || content.length > 0) {
				let para = document.createElement("p")
				para.textContent = content;
				element.append(para)
		}	
		return element;
	}
}