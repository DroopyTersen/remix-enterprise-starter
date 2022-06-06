# Project Structure

- [Root files and folders](#root-files-and-folders)
- [app Folder](#app-folder)
- [UI Toolkit](#ui-toolkit)

## Root files and folders

The root of the project contains files and folders that won't be touched nearly as often as `/src`.

- `/.storybook` - Setup code for Storybook (`npm run storybook`)
- `/.vscode` - Shared VS Code settings
- `/app` - Source code where all the magic happens
- `/docs` - Documentation (markdown files) and any supporting assets (images)
- `/node_modules` - All of the installed dependencies (from `npm install`)
- `/public/` - Static assets for the app. Items in this folder are excluded from the build process and served as static files.
- `/styles` - Source code for Sass files.
- `/env` - `.env` app setting files for each of your environments.
  - `/env/.env.local.example` - An example `.env` file used to show which environment variables need to be configured for local development.
    - Copy this file to **create a `.env.local`** and fill it in.
    - The `.example` file is used to avoid storing actual secret config values in source control.
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Spells out which files/folders should NOT be included in source control (built folders, .env files, node_modules etc...)
- `.prettierrc` - Prettier configuration
- `azure-piplelines.*.yml` - Azure DevOps build pipeline definitions
- `remix-env.d.ts` - Makes Remix Typescript types globally available
- `remix-config.js` - The app's remix configuration
- `package.json` - Main entry point for app. Describes dependencies and tasks (`build`, `dev`, `lint`, etc...)
- `package-lock.json` - A snapshot of dependency versions.

## app Folder

Most of the magic happens in the `app` folder

```
app/
  common/

  features/
    example1/

  routes/
    api/
    example1.tsx

  ui-toolkit/
    components/
    hooks/
    utils/
```

- `/common`
  - anything that is shared across features, but still feels specific to the Portal
  - If it feels like you could pick it up and drop it into another app, it might make sense in `ui-toolkit`
- `/features`
  - Each feature could have `/components`, `/hooks`, `/data` etc...
- `/routes`
  - This is a special remix folder that used the the file based router
  - Every file in this folder becomes a page in the app
  - Don't put anything in this folder that isn't a page!
    - It is really easy to forget this, but accidentally adding a "non-page" in this folder can cause some wonky hard to diagnose errors.
  - Generally prefer to keep Page components light weight and render components from the `features` folder.
- `/ui-toolkit`
  - Contains generic React `components` and `hooks` as well as global utility functions.

## UI Toolkit

The `ui-toolkit` contains generic React `components` and `hooks` as well as global utility functions.

- UI Toolkit is for generic code that could be shared across multiple Kolbe applications. If it is coupled to an application, it probably belongs in a feature folder.
- UI Toolkit documentation is powered by [Storybook](https://storybook.js.org/)

If you are making updates to the UI Toolkit, you can run storybook locally with:

```
npm run storybook
```
