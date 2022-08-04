# REMIX-ENTERPRISE-STACK

To create a new project using this stack, run the following command.

- When prompted, **make sure to select `Y` to run the `npm install`**.
  - If you don't, our postinstall scripts won't run for you.
- You will be prompted to choose between Javascript or Typescript. We recommend Typescript.

```sh
# When prompted, make sure to select `Y` to run the 'npm install`.
npx create-remix@latest --template droopytersen/remix-enterprise-starter
```

## What does it give you?

When you create a Remix app with this template you will get:

- [x] A Remix/React application
- [x] Code Style setup
    - A lax Typescript configuration
    - Linting(ESLint)
    - Auto-formatting(Prettier) 
- [x] CSS/Styling setup
  - [x] Sass build process
  - [x] Bootstrap with ability to provide custom theme
- [x] Setup for environment variables / config / secrets
- [x] UI Toolkit
  - Themable React components (Buttons, form inputs, modals etc...)
  - Helpful React hooks (useDebounce, usePersistedState, useUpdateEffect etc...)
- [x] Example CRUD screens for a single entity
  - [x] Shows the patterns for using querying data with a `loader`
  - [x] Shows the patterns for writing data with an `action`
  - [x] Pattern for reusing validation on the client and server
  - [x] Shows the patterns for routing/navigation
    - [x] Relative links
    - [x] Form Cancel buttons and `returnTo` pattern
  - [x] Add UI progessive enhancement to indicate form submissions
    - [x] Show a "Deleting..." text on delete
    - [x] Disable inputs while submitting
- [x] Document title & meta tags example
- [x] Ladle setup
  - Work on your components in isolation with Ladle
  - Document the app's reusable components to encourage more reuse
- [x] Auth utilities
  - Theoretically you just plug in your own auth provider
- [x] Documentation templates
  - [x] Project level README
  - [x] App Settings, Secrets and Configurations
  - [x] Hosted envrionments and CI/CD
  - [x] Developer Guidelines
  - [x] Git Workflow
  - [x] Project Structure
  - [ ] UI Cheatsheet

## Key technologies

- [Remix Docs](https://remix.run/docs)
- Bootstrap
- UI Toolkit
- React Hook Form

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.
