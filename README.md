# DemoBlaze Automation

End-to-end and API automation for [DemoBlaze](https://www.demoblaze.com) using Playwright and TypeScript.

## Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Java 8+** (required for Allure Report)

## Installation

```bash
npm install
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:ui` | Run tests with Playwright UI mode |
| `npm run test:headed` | Run tests in headed browser |
| `npm run test:ui-only` | Run UI tests only |
| `npm run test:api-only` | Run API tests only |
| `npm run report` | Open Playwright HTML report |
| `npm run report:allure` | Generate Allure report |
| `npm run report:allure:open` | Open Allure report (after generate) |
| `npm run report:allure:serve` | Generate and open Allure report in browser |

## Project Structure

```
demoblaze/
├── api/                    # API layer
│   ├── cart.api.ts         # Cart endpoints (add, view, reset)
│   └── types.ts            # API types
├── config/
│   └── env.config.ts       # Environment & timeouts
├── constants/
│   ├── endpoints.ts        # API endpoint paths
│   └── url-path.ts         # URL paths
├── data/                   # Test data
│   ├── users.json          # User credentials
│   ├── products.json       # Product catalog
│   ├── orders.json         # Order details
│   └── index.ts            # Data exports
├── fixtures/
│   └── page.fixtures.ts    # Playwright page object fixtures
├── pages/                  # Page Object Model
│   ├── base.page.ts        # Base page class
│   ├── home.page.ts
│   ├── cart.page.ts
│   ├── product.page.ts
│   ├── modal/
│   │   ├── login.modal.ts
│   │   ├── place-order.modal.ts
│   │   └── purchase-confirmation.modal.ts
│   └── shared/
│       └── navigation.bar.ts
├── tests/
│   ├── ui/                 # UI / E2E tests
│   │   ├── login.spec.ts
│   │   ├── add-to-cart.spec.ts
│   │   ├── remove-from-cart.spec.ts
│   │   └── complete-purchase.spec.ts
│   └── api/                # API tests
│       ├── add-to-cart.api.spec.ts
│       └── create-order.api.spec.ts
├── playwright.config.ts
└── package.json
```

## Test Coverage

### UI Tests

- **Login** – Valid/invalid credentials, error dialogs
- **Add to Cart** – Add product, verify in cart
- **Remove from Cart** – Remove product, verify cart updates
- **Complete Purchase** – Full flow: login → add product → place order → confirmation

### API Tests

- **Add to Cart** – Add product via API, verify in cart
- **Create Order** – Cart setup and order flow via API

## Allure Report

After running tests, generate and view Allure Report:

```bash
npm test
npm run report:allure:serve
```

Or generate first, then open:

```bash
npm run report:allure
npm run report:allure:open
```

## Tech Stack

- **Playwright** – Browser automation & API testing
- **TypeScript** – Typed tests and page objects
- **Page Object Model** – Reusable page components
- **Fixtures** – Shared test setup and page objects
