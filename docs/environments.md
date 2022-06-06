# Environments

> 📌 TODO: Rewrite this to the specifics of your project

`START_EXAMPLE Environments Documentation`

The Acme Portal has four environments.

1. `local` - This means you are running locally on your machine
2. `test` - This is an Azure App Service that is automatically deployed to when we update the `develop` branch
3. `stage` - This is an Azure App Service that is automatically deployed to, overnight, when we update the `release` branch
4. `prod` - This is an Azure App Service that is manually deployed to when we update the `main` branch

[Acme Portal in `test`](https://acme-portal-test.azurewebsites.net)
[Acme Portal in `stage`](https://acme-portal-stage.azurewebsites.net)
[Acme Portal in `prod`](https://acme-portal-prod.azurewebsites.net)

## Pipelines

Azure DevOps pipelines are setup to:

- `develop` - automatically build when there is a push
- `develop` - automatically release to TEST when there is a new `develop` artifact
- `release` - automatically build there there is a push to `release`
- `release` - do an automatic **overnight** release to STAGE if there is a new `release` build artifact
- `main` - automatically build when there is a push
- `main` - require manual release

### Acme Portal

The [`develop-portal-build`](https://Acme.visualstudio.com/AcmePortal/_build?definitionId=6) pipeline will build the Acme Portal application _anytime_ a commit to the `develop` branch is made.

The [`test-portal-release`](https://Acme.visualstudio.com/AcmePortal/_release?_a=releases&view=mine&definitionId=3) pipeline will release the Acme Portal app to the `test` environment _anytime_ artifacts are published from the `develop-portal-build` pipeline.

The [`release-portal-build`](https://Acme.visualstudio.com/AcmePortal/_build?definitionId=27) pipeline will build the Acme Portal application _anytime_ a commit to the `release` branch is made.

The [`stage-portal-release`](https://Acme.visualstudio.com/AcmePortal/_release?_a=releases&view=mine&definitionId=4) pipeline will release the Acme Portal app to the `stage` environment _overnight_ when artifacts are published from the `release-portal-build` pipeline.

The [`main-portal-build`](https://Acme.visualstudio.com/AcmePortal/_build?definitionId=7) pipeline will build the Acme Portal application _anytime_ a commit to the `main` branch is made.

The [`prod-portal-release`](https://Acme.visualstudio.com/AcmePortal/_release?_a=releases&view=mine&definitionId=8) pipeline requires a manual release of the Acme Portal app to the `prod` environment after artifacts are published from the `main-portal-build` pipeline.

`END_EXAMPLE Environments Documentation`
