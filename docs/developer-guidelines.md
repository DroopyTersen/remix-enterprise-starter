# Developer Guidelines

- [Overview](#overview)
- [Developing a User Story](#developing-a-user-story)
- [Pull Requests](#pull-requests)
- [Coding Styles](#coding-styles)
  - [Code Formatting and Linting](#code-formatting-and-linting)
  - [Code Conventions](#code-conventions)

## Overview

This document outlines to coding styles/conventions/rules of engagement that our team has agreed to.

## Developing a User Story

- [ ] Drag the User Story to the "In Progress" column
- [ ] Create a feature branch off of `develop`
  - A feature branch should be prefixed with the type and contain the story number with a brief description.
  - E.g. `feature/#123-add-client-form`
  - E.g. `bugfix/#789-fix-client-save`
- [ ] Develop the User Story
  - Feel free to submit multiple smaller PRs per User Story. This is much preferred over a single giant PR.
- [ ] Verify Acceptance Criteria locally
  - Re-read the Acceptance Criteria and ensure you've satisfied everything
  - Test edge cases. Try to break it!
  - Ensure you have robust error handling
- [ ] Ensure appropriate logging
  - Remove unnecessary debugging console.logs
  - Ensure you following any established logging (app insights) conventions
- [ ] Run a `npm run lint` and an `npm run build`
  - Fix any errors or warnings
- [ ] PR into `develop`
  - See "Pull Requests" below for more detail
  - Once completed, it will automatically be released to the `TEST` environment
- [ ] Re-test Acceptance criteria on TEST environent
  - Next.js can behavave different in "production" mode, so it is important you re-test here
- [ ] Drag the User Story to "Ready to Deploy" column

## Pull Requests

**As a developer**

1. Create Pull Request your feature branch into the `develop` branch
   - _TODO: Post a message in Teams to notify others?_
2. Wait for at least 1 other person to approve
   - When a reviewer leaves comments, they could do one of the following:
     - Comments & **Approved**
       - The comments were more of an "FYI" or maybe a "try this next time".
       - Feel free to complete the PR
     - Comments & **Approved w/ Suggestions**
       - The Reviewer has a few suggested tweaks but doesn't feel the need to re-review when you are done.
       - If further discussion is required (you have a question or a response to the comment), please reply back on the PR so whole team can track the discussion and learn.
       - Once you are comfortable with the suggestions, make the changes and complete the PR.
     - Comments w/ **No Approval**
       - The reviewer has suggested larger changes that may benefit from another review once implemented.
       - If further discussion is required (you have a question or a response to the suggestions), please reply back on the PR so whole team can track the discussion and learn.
       - Once you are comfortable with the suggestions, make the changes and request another review
         - _TODO: Post a message in TEAMS?_
3. Complete the PR
   1. Select the "Squash commit" merge type
   2. Uncheck "Complete associated work items after merging"
   3. Check the box to delete the feature branch after merging to `develop`.
   4. Update the commit message to a useful summary of your PR. Ideally include the User Story ID.
   - ![Complete PR](assets/complete-pr.png)
4. Make sure the Build and Release pipelines succeed

**As a reviewer**

_TODO: Describe reviewer etiquette_

## Coding Styles

### Code Formatting and Linting

This project uses both ESLint and Prettier. This means we shouldn't need spend time during code reviews suggesting formatting and code style changes.

- For formatting we leverage Prettier to autoformat our code on save
  - We using default conventions plus what is configured in `.prettierrc`.
- ESLint ensures we are following prescribed code standards (linting).
- We generally prefer to take the stance of "_just accept the default recommendations_" of the tools.
  - These tools cover a lot of subjective preferences
  - Spending days finely tuning things to our personal preferences opens the door for unnecessary conflict (bike-shedding). We feel the best choice is to take the defaults and avoid those discussions all together.
  - Aka: If it's not important enough to come as a Prettier or Next.js ESLint default setting, it's probably not important to spend time arguing about.

### Code Conventions

_TODO: Agree on any coding conventions._

Examples could include...

- React Component Props interface names
- Default function syntax (function definition, arrow functions etc...)
- Generally 1 component per file
- etc...
