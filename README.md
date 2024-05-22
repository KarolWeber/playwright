# Playwright course

## Links
- `https://demo-bank.vercel.app/`

## Commands
- new project with playwright => `npm init playwright@latest`
- record test => `npx playwright codegen {url}` 
- run test without browser GUI => `npx playwrigth test`
- run test with browser GUI => `npx playwrigth test --headed`
- view report => `npx playwritht show-report`

## Playwright snippets
  - test:
  ```javascript
  test('Test case', async ({ page }) => {
   
  });
  ```

 - describe:
  ```javascript
  describe('Test suite', () => {
   
  });
  ```

  - run selected test(s): `test.only`
