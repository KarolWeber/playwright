# Playwright course

## Links

- `https://demo-bank.vercel.app/`

## Commands

- new project with playwright => `npm init playwright@latest`
- record test => `npx playwright codegen {url}`
- run test without browser GUI => `npx playwrigth test`
- run test with browser GUI => `npx playwrigth test --headed`
- run test with specific tags => `npx playwrigth test --grep "@{tag}"`
- view report => `npx playwritht show-report`
- trace zip run (must be in proper folder) => `npx playwright show-trace trace.zip` 

## Playwright snippets

- test:

```javascript
test('Test case', async ({ page }) => {});
```

- describe:

```javascript
describe('Test suite', () => {});
```

- run selected test(s): `test.only`

## Playwright config
- congif file => `playwright.confir.js
  - disable browser:
    ```javascript
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    ```

  - enable video on fail:
    ```javascript
    use: {
      video: 'retain-on-failure',
    },
    ```

    - enable Trace Viever on fail
    ```javascript
    use: {
      trace: 'retain-on-failure',
    },
    ```

### Prettier

- install Prettier => `npm install --save-dev --save-exact prettier`
- configure Prettier

  - exlude files in `.prettierignore`

    ```
    package-lock.json
    playwright-report
    test-results

    ```

  - set rules in `.prettierrc.json`
    ```
    {
        "singleQuote": true
    }
    ```

- run Prettier => `npx prettier --write .`
