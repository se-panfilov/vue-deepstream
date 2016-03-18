## Table of contents:
- [Reporting Issues](#reporting-issues)
- [Submission Guideline](#submission-guidelines)
 - [Submit Issues](#submit-issues)
 - [Submit Pull Requests](#submit-pull-requests)
- [Development Process](#development-process)
- [Coding Rules](#coding-rules)
- [Commit Guidelines](#commit-guidelines)
 - [Message Format](#message-format)
 - [Revert](#revert)
 - [Type](#type)
 - [Subject](#subject)
 - [Body](#body)
 - [Footer](#footer)

## Reporting Issues

If you detect any issue feel free to [submit an issue](#submit-issues) or in the best case scenario [submit a PR](#submit-pull-requests). :smiley:

## Submission Guideline

### Submit Issues

Before you submit an issue search the archive. Your question might already have been answered or asked by someone else.
</br></br>
If your issue appears to be a bug that hasn't been reported, open a new issue and follow the provided template structure. If it doesn't fit your needs try to be as accurate as possible and provide use cases when necessary.
</br></br>
You can submit new issue [here](https://github.com/arexio/vue-deepstream/issues/new).

### Submit Pull Requests

Before submit a Pull Request (PR) consider the following guidelines:
* Search [here](https://github.com/arexio/vue-deepstream/pulls) for open or closed PR similar to your submission
* Follow the [Development Process](#development-process)
* Follow the [Coding Rules](#coding-rules)
* Follow the [Commit Guidelines](#commit-guidelines)

## Development Process

* Fork and clone the repository. Check [here](https://help.github.com/articles/fork-a-repo/) if you need help.
* Create a new branch `git checkout -b <branch-name>`
* Code as much as you want but make sure you follow the [coding rules](#coding-rules)
* Commit your changes using a [descriptive](#message-format) message. Avoid history pollution and submit only a commit (`rebase -i` is your friend)
* Open a PR to `arexio/vue-deepstream:master`
* If changes are suggested then:
 * Make the require updates
 * Run the test suites again
 * Rebase your branch and force push to your GitHub repository (to update your PR)

When your PR is merged you can safely delete your branch and pull the changes from the main (upstream) repository.

## Coding Rules

Keep this rules in mind:
* All features or bug fixes **must be tested** by one or more specs
* All public API methods **must be documented**

## Commit Guidelines

To keep the commit history readable we provide a guideline to format the commit messages.

### Message Format

Each commit message must have at least a **header**. You can also include a **body** with more detailed info if necessary and in some cases you will have to include a **footer**. This should be the structure:
```
<type>: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
The **header** cannot be longer than 100 characters.

### Revert

If the commit reverts another commit the header **must** begin with `revert:` followed by the header of the reverted commit. The body should also say `Reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:
* **feat**: New Feature
* **fix**: Bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect meaning of the code (white-space, formatting, missing semi-collons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting tests
* **build**: Changes that affect the build system
* **ci**: Changes to CI configuration scripts
* **chore**: Other changes that don't modify `src` or `test`

### Subject

Contains succinct description of the changes:
* use the imperative, present tense: "change" not "changed" not "changes"
* don't capitalize first letter
* do not (.) at the end

### Body

As in the **subject** use the imperative, present tense. Should include the motivation for the change, contrast with previous behaviour.

### Footer

The footer should contain information about **Breaking Changes** and is also the place to reference the issues that this commit closes.
</br></br>
**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines followed by a description of the breaking change.
</br></br>
In the case of this commit solving an open issue it **must** reference and close them.

Example, close one issue:
```
Closes #1
```

Example, close multiple issues:
```
Closes #1, #23, #45
```
