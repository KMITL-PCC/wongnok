# Testing by Playwright

- cd tests

## + Run All Test 
- npx playwright test

## + Run Test Each Folders

## Frontend-In-Test 
Integration Testing of Frontend
- npx playwright test --project=Frontend-In-Tests


## Backtend-In-Test 
Integration Testing of Backend
- npx playwright test --project=Backend-In-Tests


## E2E-Tests
System Testing 
- npx playwright test --project=E2E-Tests

---

## + Run Flie Test
- npx playwright test tests/backend/authApi.spec.ts

---

## + See Test Report
- npx playwright show-report