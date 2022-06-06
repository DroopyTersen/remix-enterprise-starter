# Git Workflow Expectations

- [Branching Strategy](#branching-strategy)
- [Git Odds and Ends](#git-odds-and-ends)
- [Releases](#releases)
  - [Update Version](#update-version)
- [Useful Git Commands](#useful-git-commands)

## Branching Strategy

A modified version of [trunk-based development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development) is to be used on this project.

- The `main` branch represents the current production release of the application.
- The `release` branch represents a _candidate_ for production release.
- The `develop` branch contains on-going development as well as the full history of development commits.
- The `develop` branch will be merged (no squash) into the `release` branch when a release candidate is ready.
- The `release` branch will be merged (no squash) into the `main` branch when a production release is ready.
- A production `hotfix` branch can be created from `main` and merged (no squash) back into `main` and `develop` upon completion.

- `feature` branches _must_ be branched from `develop` and subsequently a pull request (PR) should be opened for the merge back into `develop`
  - `feature` branches should be squashed when merging into `develop`.
  - `feature` branch should be prefixed with the type and the branch should contain the story number with a brief description. E.g. `feature/#123-add-client-form` or `bugfix/#789-fix-client-save`
  - At least 1 approval is required to complete the PR.
  - Unless the PR is out of the ordinary, PR reviews should be timeboxed to simply look for inconsistencies or potential issues.

## Git Odds and Ends

A clean Git commit history is important for change context and search.

- Squash commit the feature branch PR into `develop`.
- Commit message should be clear and include the story number. E.g. "#123 Add Client Form".
- Be sure to delete remote branch after PR merge.

![Complete PR](assets/complete-pr.png)

## Releases

Azure DevOps is used to automate continuous integration (CI) and continuous deployment (CD).

The `develop` branch points to the **TEST** environment, and it has build and release pipelines that automatically initiate CI/CD anytime a commit to the `develop` branch occurs.

The `release` branch points to the **STAGE** environment, and its build pipeline will automatically initiate anytime a commit to the `release` branch occurs. If there are any builds, the release pipeline will automaitcally initiate overnight.

The `main` branch points to the **PRODUCTION** environment, and its build pipeline will automatically initiate anytime a commit to the `main` branch occurs. The release pipeline requires manual initiation.

To create a release candidate, perform the following steps:

- Create a PR that merges `develop` into `release`.
- Approve PR
- Complete PR
  - **Merge (no fast forward) commit**
  - Customize merge commit message: “Develop -> Release”

Once the above steps are complete, the build pipelines will initiate and set aside new build artifacts for the `release` release pipelines that run overnight.

### Update Version

- Create a feature branch, `feature/version-bump`, from `develop`
- Increment the `version` property in `package.json`
  - Run `npm i` to update the `package-lock.json`
  - The version convention is `1.[Sprint Number].[Build Number]`
    - Always increment the `[Build Number]` and increment the `[Sprint Number]` if the next release will be for a new sprint
- Commit changes with a message of "Version -> 1.x.x"
- Create a PR for `feature/version-bump`
- Approve PR
- Complete PR
  - **Squash commit**
  - Customize merge commit message: “Version -> 1.x.x”

These sames steps can be completed with `release` to `main` when cementing a production release, and updating the version would not be necessary in that case.

## Useful Git Commands

If on Windows, download [Git for Windows](https://git-scm.com/download/win).

`git config user.email "your email"` - set the email address to be used for commits.

`git config user.name "your name"` - set the name to be used for commits.

`git clone [repo url]` - download a repo to your local environment.

`git checkout [branch name]` - switch Git branches. E.g. `git checkout feature/abc`.

`git checkout -b [branch name]` - create and switch to a new branch from the current branch.

`git checkout .` - undo non-staged changes.

`git checkout [filepath]` - undo a specific file's non-staged changes.

`git branch` - display a list of local branches.

`git branch -D [branch name]` - delete a local branch.

`git pull [remote] [branch name]` - fetch source code from remote and merge into current branch. E.g. `git pull origin feature/abc`.

`git fetch [remote] [branch name]` - fetch source code from remote.

`git status` - see current branch and unstaged/staged files.

`git log` - see a history of commits for the current branch. Press up/down arrow to scroll and `q` to stop log.

`git add .` - stage all local files with changes.

`git add [filepath]` - stage a specific local file with changes.

`git commit -m "your message"` - create a commit with all local staged files.

`git push -u [remote] [branch name]` - push local branch to remote branch and sets the upstream. E.g. `git push -u origin feature/abc`.

`git push [remote] [branch name]` - push local commits to remote branch from local branch. E.g. `git push origin feature/abc`.

`git merge [branch name]` - take the commits of the specified branch and apply them into the current branch.

`git rebase [branch name]` - replay the commits of the current branch on top of the commits from the specified branch. E.g. `git rebase develop`.

`git rebase -i HEAD~[number of commits to adjust]` - open an interactive file to squash and/or rename commits in the current branch. E.g. `git rebase -i HEAD~3`. Press `:wq` to write/save and quit file.
