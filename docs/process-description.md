# Backend Lifecycle Overview

This document describes the startup and structural flow of the TypeScript backend.

## Starting the Project

To start the backend, run the following command:

```bash
npm run dev
```

This command starts the file `src/index.ts`, where an instance of the main `App` class is initialized and the server is launched.

## Core Initialization

Within `src/index.ts`, the application is started with:

```ts
const app = new App();
app.startServer();
```

This triggers the following lifecycle:

### 1. App Class

The `App` class is responsible for:
- Initializing an Express application
- Loading middlewares such as `express.json`, `cors`, and `morgan`
- Dynamically registering all available route files from the `routes` directory
- Starting the HTTP server on the specified port

### 2. Route Loading

In the `setupRoutes` method:
- All `.route.ts` or `.route.js` files in the `routes` directory are loaded dynamically.
- Each route file exports a list of routes conforming to the `IRoute` interface.

Each route is bound to the Express app using the defined method and path. A sample route file follows this structure:

```ts
const routes: IRoute[] = [
  {
    routeName: '/documentation/all',
    method: 'get',
    controller: DocumentationController.getAllDocs,
    comments: 'Fetch all documents',
  },
];
```

## Controllers and Services

- Each route calls a specific method in a **Controller** (e.g., `DocumentationController.getAllDocs`).
- Controllers are responsible for handling requests and responses.
- Business logic and database interactions are abstracted into **Services**.

### Why this structure?

This architecture offers:
- Clear separation of concerns
- Maintainability and scalability
- Easier testing and debugging

## Summary

- The app boots from `src/index.ts` and builds up via the `App` class
- Routes are dynamically loaded and linked to controllers
- Controllers delegate business logic to service layers

This modular design is prepared for future scaling and supports clean and readable code organization.
