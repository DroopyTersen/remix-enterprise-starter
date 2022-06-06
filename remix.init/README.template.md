# {REMIX-ENTERPRISE-STACK-APP-NAME}

- [Overview](#overview)
- [Useful links](#useful-links)
- [Getting Started](#getting-started)
  - [1. Install required tooling](#1-install-required-tooling)
  - [2. Clone the repo and installl NPM dependencies](#2-clone-the-repo-and-installl-npm-dependencies)
  - [3. Setup your local config](#3-setup-your-local-config)
  - [4. Run the app](#4-run-the-app)
- [Project Tasks](#project-tasks)
- [Environments](#environments)
- [Further Documentation](#further-documentation)

## Overview

> 📌 TODO: Describe at a high level what the app does

> 📌 TODO: Describe at a high level the architecture and tech stack.

## Useful links

- [Local Environment](http://localhost:3000)

> 📌 TODO: Add more useful links to things like:
>
> - Stage and Prod urls
> - DevOps backlog
> - Anything else that would be helpful to a developer

## Getting Started

### 1. Install required tooling

- Install [VS Code](https://code.visualstudio.com).

- Install v16.x (latest LTS) of **Node.js** (and v8.x of `npm`) [for Windows](https://nodejs.org/dist/v16.13.0/node-v16.13.0-x64.msi) or [for macOS](https://nodejs.org/dist/v16.13.0/node-v16.13.0.pkg).
  - This will be used to run (locally) and build the application.
- Install the **Prettier** Extension for VS Code.
  - This will be used to format code after each file is saved.
  - Open up the Extensions view in VS Code and search for "Prettier" and install it.
  - Formatting will automatically be enabled via `.vscode/settings.json`.
- Install the **ESLint** Extension for VS Code.
  - This should be used before commits and it will be used to ensure consistent code patterns across the team.
  - Open up the Extension view in VS Code and search for "ESLint" and install it.

### 2. Clone the repo and installl NPM dependencies

Open a terminal and run the following clone the project into a folder named `{REMIX-ENTERPRISE-STACK-APP-NAME}`

```
git clone 📌ENTER_YOUR_REPO_URL_HERE {REMIX-ENTERPRISE-STACK-APP-NAME}
cd {REMIX-ENTERPRISE-STACK-APP-NAME}
npm install
```

### 3. Setup your local config

The project won't run correctly until you have setup a few local app settings.

> Check out the [Configuration Docs](docs/configurations.md) for more detail.

1. Copy [`/env/.env.local.example`](env/.env.local.example) to create a new file, `/env/.env.local`.
2. Fill in any secrets. This file will not be included in source control (via the `.gitignore`).

### 4. Run the app

From the root of the project run the following command in your terminal:

```
npm run dev
```

This will start a local dev server that will automatically refresh whenever you make changes to your source code.

## Project Tasks

The following tasks can be found in the `scripts` section of [`package.json`](package.json).

- `npm run dev`
  - Start running locally.
  - Any changes you make to source code will instantly show up in the browser.
- `npm run build`
  - This creates a production build of the site.
- `npm run lint`
  - Checks your code for issues w/ ESLint
- `npm run storybook`
  - Opens up documentation for shared components, hooks, and patterns via [Storybook](https://storybook.js.org/)

## Environments

The app has the following environments:

> 📌 TODO: Adjust this to match the specifics your project

1. `local` - This means you are running locally on your machine
2. `test` - This is automatically deployed to when we update the `develop` branch
3. `stage` - This is automatically deployed to, overnight, when we update the `release` branch
4. `prod` - This is manually deployed to after we update the `main` branch

The [environments documentation](docs/configurations.md) contains much more detail.

## Further Documentation

The following are links to more more details documentation

- [Configurations & Environments](docs/configurations.md)
  - Describes how we manage application settings (both public and private) across multiple environments.
  - Describes the multiple environments (`local`, `test`, `stage`, etc..) and links to important environment resources
- [Project Structure](docs/project-structure.md)
  - Detailed explanations of the project structure
- [UI Cheatsheet](docs/ui-cheatsheet.md)
  - A quick reference for common UI tasks
- [Developer Guidelines](docs/developer-guidelines.md)
  - Describes the process for working on user stories, code reviews via pull requests, coding style etc...
- [Git Workflow](docs/git-workflow.md)
  - Describes how we leverage GIT on this project
- Key Technologies
  - [React](https://beta.reactjs.org/learn)
  - [Remix](https://remix.run/docs/en/v1)
  - [Bootstrap 5](https://getbootstrap.com/docs/5.1/utilities/flex/)
- [UI Toolkit](http://localhost:3000/storybook)
  - **Styling (CSS) guidance** can be found in the [Design System](http://localhost:3000/storybook/index.html?path=/story/design-system--background-colors) section.
  - **Shared Components** can be found in the [Forms & Inputs](http://localhost:3000/storybook/index.html?path=/story/forms-inputs-autocomplete--basic) & [Surfaces](http://localhost:3000/storybook/index.html?path=/story/surfaces-surface--widgets) sections.
  - **Custom React Hooks** can be found under the [Hooks](http://localhost:3000/storybook/index.html?path=/story/hooks-usedebounce--page) section.
  - View the full Storybook docs on non-prod environments by adding `/storybook` to the app's url.
