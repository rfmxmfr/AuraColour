
# TODO – Fix ESLint issues in codebase

Follow this checklist to eliminate all lint errors shown in the current ESLint output. Work through one group at a time and commit frequently.

## 1 | General workflow
- [ ] Update local dependencies to ensure you are using the same ESLint, Prettier, and plugin versions defined in package-lock.json
- [ ] Run `npm run lint -- --fix` (or `yarn lint --fix`) and let ESLint apply automatic fixes
- [ ] Re-run the linter without `--fix` to see remaining errors—use this file as a guide
- [ ] Push changes in small, logically grouped commits labelled `chore(lint): …`

## 2 | Spacing & formatting rules
- [ ] **arrow-spacing** – ensure exactly one space before and after the fat arrow (`()=>`→`() => `)
- [ ] **comma-dangle** – add trailing commas in multiline objects/arrays/functions as required by your config
- [ ] **object-curly-spacing** – use spaces inside braces (`{ foo: 1 }`)
- [ ] **indent** – conform to the 2-space indent standard throughout JS/TS/JSX files

## 3 | Import hygiene
- [ ] **import/order** – group imports as follows: builtin, external, internal, parent, sibling, index; alphabetise within groups; add blank line between groups
- [ ] **import/no-duplicates** – consolidate multiple imports from the same module
- [ ] **import/no-extraneous-dependencies** – ensure every imported package is listed in package.json

## 4 | Unused & duplicate code
- [ ] **no-unused-vars** – delete or use variables, function parameters, React props that are never referenced
- [ ] **no-duplicate-case / default-case-last** – remove duplicate `case` labels and move default case to the end of switch statements

## 5 | Console & debugging
- [ ] **no-console** – replace `console.log`/`console.error` with a logger util or remove entirely
- [ ] **no-debugger** – remove all `debugger;` statements

## 6 | React & JSX-specific issues
- [ ] **react/jsx-indent / react/jsx-indent-props** – align JSX tags and props at 2-space indent
- [ ] **react/self-closing-comp** – convert empty JSX elements (`<Box></Box>`) to self-closing (`<Box />`)
- [ ] **react/no-unused-prop-types** – delete unused prop declarations
- [ ] **react-hooks/exhaustive-deps** – review each useEffect/useCallback dependency array; include all referenced values or justify omission with `// eslint-disable-line react-hooks/exhaustive-deps`

## 7 | TypeScript-specific fixes (if applicable)
- [ ] **@typescript-eslint/explicit-function-return-type** – add explicit return types to exported functions
- [ ] **@typescript-eslint/no-unused-vars** – clean up unused types, enums, interfaces

## 8 | Accessibility
- [ ] **jsx-a11y/anchor-is-valid** – use `<Link>` or add `href="#"` and `role="button"` as needed
- [ ] **jsx-a11y/no-static-element-interactions** – add `role`/`tabIndex` or convert to semantic elements

## 9 | Comments & disable directives
- [ ] Search for `// eslint-disable` or `/* eslint-disable */` blocks and remove or narrow their scope

---

### Completion criteria
- Zero ESLint errors on `npm run lint`
- CI pipeline passes
- PR approved and merged
1 | Preparation and Project Hygiene
Before you touch source files, make sure your environment matches the project configuration:

Update all dependencies with the exact versions pinned in package-lock.json or yarn.lock.

Run the linter once with --fix to let ESLint apply automatic corrections.

Commit those auto-fixes separately so they are easy to review later.

Re-run npm run lint (or the Yarn equivalent) without --fix and use the remaining warnings as your to-do list.

Checklist
 Dependencies match lock-file versions.

 Auto-fix commit pushed.

 Fresh lint run shows only manual-fix items.

2 | Formatting Consistency
Most of the output lines concern whitespace and style rules enforced by Prettier or core ESLint formatting plugins.

Actions
arrow-spacing – ensure exactly one space around every fat arrow:

js
// Bad
const add = (a,b)=>a+b;
// Good
const add = (a, b) => a + b;
comma-dangle – add trailing commas to multiline literals when your config demands it.

object-curly-spacing – keep spaces inside {} for objects, imports and destructuring.

indent – standardise two-space indentation across JS/TS/JSX.

Checklist
 All arrow functions spaced correctly.

 Trailing commas added in multiline constructs.

 Braces padded with single spaces.

 Two-space indent verified in every file.

3 | Import Hygiene
Keeping imports tidy improves readability and prevents circular dependencies.

Actions
import/order – group and alphabetise:

Node built-ins

External packages

Internal aliases

Parent (../)

Sibling (./)

Index (.)
Separate groups with a blank line.

import/no-duplicates – collapse multiple imports from the same module.

import/no-extraneous-dependencies – any package appearing in source must exist in dependencies or devDependencies.

Checklist
 Imports grouped and alphabetised.

 Duplicate import lines merged.

 Every package listed in package.json.

4 | Unused or Duplicate Code
Removing dead code decreases bundle size and eliminates false positives.

Actions
no-unused-vars – delete variables, parameters, and React props never referenced.

no-duplicate-case & default-case-last – ensure every switch has unique cases and places default last.

Delete commented-out blocks that will never return.

Checklist
 Zero unused variables or props.

 All switch statements reviewed.

 Legacy commented code removed.

5 | Logging and Debug Statements
Debug artefacts left in production noise up the console and may leak information.

Actions
Replace console.log / console.error with your project’s logger utility or remove them outright.

Delete every debugger; line.

Checklist
 No console.* in production code.

 No debugger statements remain.

6 | React & JSX Alignment
Most JSX-specific complaints are cosmetic but must be fixed to pass CI.

Actions
react/jsx-indent & jsx-indent-props – ensure elements and their props align at 2-space indents.

react/self-closing-comp – change empty elements (<Tag></Tag>) to self-closing (<Tag />).

react/no-unused-prop-types – remove prop declarations that are never consumed.

react-hooks/exhaustive-deps – review every useEffect, useCallback, and useMemo.

Add missing deps.

Or intentionally suppress with inline comment only when behaviour is understood.

Checklist
 JSX indent consistent.

 Empty elements self-closed.

 Unused prop types and default props pruned.

 Hook dependency arrays audited.

7 | TypeScript-Specific Clean-up
If your project uses TS, ESLint extends additional rules.

Actions
@typescript-eslint/explicit-function-return-type – write explicit return types on all exported functions.

@typescript-eslint/no-unused-vars – delete unused interfaces, enums and generics.

Turn on noImplicitAny in tsconfig.json if not already enabled; this prevents future occurrences.

Checklist
 All exported functions typed.

 No unused TS identifiers.

 noImplicitAny verified.

8 | Accessibility Improvements
Lint rules from eslint-plugin-jsx-a11y ensure basic a11y compliance.

Actions
jsx-a11y/anchor-is-valid – wrap anchors rendered as buttons in your routing component (<Link>), or add role="button" and href="#".

jsx-a11y/no-static-element-interactions – give non-interactive elements a keyboard role and tabIndex={0}, or swap for a semantic tag.

Checklist
 All interactive roles valid.

 Keyboard navigation supported everywhere.

9 | Audit Disable Directives
Broad eslint-disable comments allow errors to creep back in unnoticed.

Actions
Search the codebase for any form of eslint-disable.

Remove them or narrow scope to the exact rule and line.

Add a comment explaining why the exception is necessary.

Checklist
 Global disables eliminated.

 Inline disables justified and scoped narrowly.

10 | Finishing Up
After completing every checklist above:

Run the full test suite and confirm no regressions.

Execute npm run lint and verify zero errors.

Push a final commit titled chore: resolve all ESLint violations.

Create a pull request and ensure CI passes.

Final Definition of Done
Linter passes with 0 errors.

Unit/integration tests green.

Code reviewers approve.

Branch merged into main.

Follow this structured approach and you will clear the lint backlog systematically without introducing new bugs or style drift.