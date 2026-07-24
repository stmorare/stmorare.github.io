# LESSONS.md

---

# Lesson 1 — Git & Project Planning

## What is Git?

Git is a version control system that records the history of a software project.

---

## What is GitHub?

GitHub is a cloud platform that hosts Git repositories and enables collaboration.

---

# Lesson 2 — Development Environment

## What is Node.js?

Node.js is a JavaScript runtime that allows JavaScript to run outside a web browser.

(The theatre where the play is performed.)

---

## What is npm?

Node Package Manager.

(The acting agency that supplies actors, directors and equipment.)

---

# Lesson 3 — Git Workflow

## Basic Git Workflow

git status

↓

git add

↓

git commit

↓

git push

---

## Repository

Only ONE Git repository should exist for PortfolioPro.

Never create nested Git repositories.

---

# Lesson 4 — Next.js Foundations

## What is npx?

npx temporarily downloads and executes a package without permanently installing it.

---

## What is package.json?

The project's manifest file.

It tells npm which packages are required for the project.

---

## What is package-lock.json?

A lock file that records the exact package versions installed.

It ensures everyone installs identical dependencies.

---

## What is .gitignore?

A list of files and folders that Git should ignore.

---

## Generated Files

Examples:

- node_modules
- .next

Generated files should not be committed.

---

## Source Files

Examples:

- app/
- public/
- package.json
- README.md

Source files should be committed.

---

## Lesson 5 — Repository Refactoring

PortfolioPro now consists of a single Git repository containing the Next.js application.

The previous nested Git repository was removed.

Professional projects should maintain one Git repository per application whenever practical.

---

Current Sprint:

Sprint 2 — Build Portfolio Layout