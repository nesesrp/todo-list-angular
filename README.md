# Todo List Angular

A simple todo list application built with Angular (standalone components).

## Tech Stack

- [Angular](https://angular.dev) 19 (standalone components, signals-ready)
- TypeScript
- Karma / Jasmine for unit tests

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   └── todo.model.ts        # Todo interface
│   │   └── services/
│   │       └── todo.service.ts      # Todo state/business logic
│   ├── features/
│   │   └── todo/
│   │       ├── todo-list/           # Renders the list of todos
│   │       ├── todo-item/           # Single todo row
│   │       └── todo-form/           # Form for adding new todos
│   ├── app.component.ts             # Root component
│   ├── app.config.ts                # App-wide providers configuration
│   └── app.routes.ts                # Route definitions
├── index.html
├── main.ts
└── styles.css
```

- `core/` holds shared, app-wide building blocks (models, services).
- `features/todo/` holds the todo feature's presentational components.

## Getting Started

### Prerequisites

- Node.js (v22.17+ recommended)
- npm

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on source changes.

### Build

```bash
npm run build
```

Build artifacts are output to the `dist/` directory.

### Unit tests

```bash
npm test
```

Runs unit tests via [Karma](https://karma-runner.github.io).

## Code Scaffolding

This project uses the Angular CLI. To generate a new component:

```bash
ng generate component features/todo/component-name
```

## License

This project is unlicensed / for personal use.
