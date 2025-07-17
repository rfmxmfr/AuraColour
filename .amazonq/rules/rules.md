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
