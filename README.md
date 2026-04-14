# todo.js - Todo App
<a href="https://jaws-1684.github.io/todo">View Demo</a>

## Description
The idea behind this project is to experiment and practice object oriented programming in javascript.
## About The Project
<p align="center">
  <img height="350" src="https://raw.githubusercontent.com/jaws-1684/todo/refs/heads/images/171712.jpg">
</p>

The application lets you organise tasks into projects and filter them by priority, due date, or completion status. All data is persisted automatically via `localStorage`, so nothing is lost between sessions.

### Built With

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)


---

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/jaws-1684/todo.git
   ```
2. Navigate into the project directory
   ```sh
   cd todo
   ```
3. Install dependencies
   ```sh
   npm install
   ```


---

## Usage

### Development server
```sh
npm run dev
```

Opens a live-reloading dev server powered by webpack-dev-server.

### Watch mode
```sh
npm run watch
```

Rebuilds automatically on file changes without starting a dev server.

### Production build
```sh
npm run build
```

Outputs optimised assets into the dist/ folder.

### Deploy to GitHub Pages
```sh
npm run deploy
```

Builds the project and pushes the dist/ folder to the gh-pages branch automatically.

---

## Project Structure


```
todo/
├── src/
│   ├── assets/
│   ├── components/          [menu, template, todos]
│   ├── controllers/         [projects_controller, todos_controller]
│   ├── models/              [project, todo classes]
│   ├── pubsub/              [pub/sub event bus]
│   ├── index.js             [entry point]
│   ├── dom.js
│   ├── extensions.js        [filter helpers]
│   ├── styles.css
│   └── template.html
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── package.json
```

## How it works
 User interactions trigger named events through a pub/sub event bus. Components publish events (e.g. `todo:add`, `project:destroy`) and controllers subscribe to them, keeping the UI and business logic fully decoupled. Models handle persistence directly, serialising state to `localStorage` on every change.
 
---

## Contributing
If you have some *amazing* improvement ideas *feel free* to contribute.

1. Clone this repo
2. Create your Feature Branch (`git checkout -b feature/my_amazing_feature`)
3. Commit your Changes (`git commit -m 'Add some amazing_feature'`)
4. Push to the Branch (`git push origin feature/amazing_feature`)
5. Open a Pull Request


---

## License

Distributed under the ISC License. See LICENSE for more information.

---

## Contact

GitHub: [jaws-1684](https://github.com/jaws-1684)
Project Link: [https://github.com/jaws-1684/todo](https://github.com/jaws-1684/todo)


---

## Acknowledgments
The following resources proved to be quite helpful:
* [The Odin Project](https://www.theodinproject.com)
* [date-fns](https://date-fns.org)
* [Webpack](https://webpack.js.org)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)