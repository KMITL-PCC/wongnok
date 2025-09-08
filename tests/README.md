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

On Folders Backend-In-Tests you can run Each Test File
- npx playwright test tests/Backend-In-Tests/loginintegration.spec.js

---

On Folders E2E-Test you can run Each Test
- npx playwright test tests/Backend-In-Tests/loginintegration.spec.js
- npx playwright test tests/E2E-Tests/Register.spec.js

---

On Folders Frontend-In-Tests you can run Each Test File
- npx playwright test tests/Frontend-In-Tests/loginintegration.spec.js

---

## + See Test Report
- npx playwright show-report