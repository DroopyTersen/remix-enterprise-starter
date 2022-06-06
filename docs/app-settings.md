# App Settings & Secrets

Also known as configurations or environment variables

- [Terminology](#terminology)
- [Managing Values](#managing-values)

> 📌 TODO: Make sure this matches your project's setup.

The app uses a combination of the following to configure each environment:

- `.env` (for Node),
- `appsettings.json` (for .NET Core)
- Azure App Service App Settings
- Azure Key Vault

## Terminology

**App Settings** - used to describe values that are in or come from `.env` or `appsettings.json`.

**App Secrets** - Special app settings that should be managed with Azure KeyVault. Locally, a secret is managed with `.env.local` or `appsettings.local.json` file, which is NOT included in source control (via the `.gitignore`).

**Azure App Service Application Settings** - used to describe values in Azure App Services that can override App Settings.
If App Settings are sensitive (see App Secrets above), they are not stored with code, rather they are stored in Azure Key Vault. The release pipelines will tell the Azure App Services to link their Azure App Service Application Settings over to Azure Key Vault values, thus overriding any App Settings.

## Managing Values

- **Non-sensitive** App Settings are managed in **source control**
  - Node (Remix/Next.js)
    - `/env/.env.*`
    - **IMPORTANT:** Remix/Next.js code can execute on both the server and client. If the app setting needs to be available to the browser, [it must be prefixed with `NEXT_PUBLIC_`](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)
  - .NET Core
    - `appsettings.*.json`
- **App Secrets** are managed with **Azure Key Vault**
  - Local App: `/env/.env.local`
  - Azure environments: `test`, `stage`, `prod`
    - Managed w/ Azure KeyValue
    - Azure App Service Application Settings reference the KeyVault values
    - Azure DevOps release pipeline sets the Azure App Service Application Settings
