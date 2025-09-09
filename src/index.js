import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

// Example of adding content to the DOM
const h1 = document.querySelector('h1');
if (h1) {
    h1.textContent = greeting;
}
