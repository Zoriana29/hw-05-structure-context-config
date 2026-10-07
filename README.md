# Playwright Authentication Tests

![Playwright Tests](https://github.com/Zoriana29/hw-05-structure-context-config/actions/workflows/playwright.yml/badge.svg)

End-to-end tests for registration and login flows in the QA Dojo training application.

Application under test: http://104.168.59.50/articles

## Covered scenarios

| ID | Scenario | Expected result |
| --- | --- | --- |
| REG-1 | Register with unique credentials | User reaches an authenticated state |
| REG-2 | Register with an already taken email | Error message is displayed |
| REG-3 | Register without an email | Validation error is displayed |
| LOGIN-1 | Sign in with valid credentials | User reaches an authenticated state |
| LOGIN-2 | Sign in with a wrong password | Login is rejected |
| LOGIN-3 | Sign in with a non-existent email | Login is rejected |

## Tech stack

- Playwright Test
- TypeScript
- Node.js 22.x
- GitHub Actions
- dotenv

## How to run

```bash
npm ci
npx playwright install
cp .env.example .env
npx playwright test
npx playwright show-report
```

### Useful commands

```bash
# Run tests with the browser window visible
npx playwright test --headed

# Open Playwright UI Mode for interactive test running and debugging
npx playwright test --ui

# Run only the test whose title matches "REG-1"
npx playwright test -g "REG-1"

# Run tests in parallel using up to 4 worker processes
npx playwright test --workers=4
```

## Environment configuration

The application URL is provided through `BASE_URL`.

Example:

```text
BASE_URL=http://104.168.59.50
```

Using `BASE_URL` keeps the environment address outside the test scenarios and makes it easier to change the target environment later.

## Design decisions

- Tests use stable test IDs and user-facing locators instead of long CSS or XPath selectors.
- Each test is designed to run independently.
- Registration data is generated dynamically to reduce collisions during repeated or parallel runs.
- Assertions use Playwright web-first `expect` checks.
- Fixed waits such as `waitForTimeout()` are avoided.
- Error messages are based on the application's actual UI behavior.
- Positive and negative authentication scenarios are covered separately.

## CI and diagnostics

- GitHub Actions is used for automated test execution.
- `BASE_URL` is provided to the test environment through configuration.
- Playwright diagnostics such as traces and failure artifacts help investigate failed tests.
- `forbidOnly` is enabled in CI to prevent an accidental `test.only` from being committed.
- Chromium is used as the configured browser for this project.

## What was practiced in this homework

- Browser, BrowserContext and Page concepts
- Test isolation
- Parallel execution with workers
- Environment configuration with `BASE_URL`
- Web-first assertions
- HTML reports and Trace Viewer
- Independent positive and negative authentication scenarios