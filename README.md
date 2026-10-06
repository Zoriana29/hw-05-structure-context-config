# Homework 5 — Playwright: Structure, Browser, Context, Page, Reporting, Config

Registration and login tests for the QA Dojo training application (Conduit).

Application: http://104.168.59.50

## Section Topic

Playwright architecture (Browser, BrowserContext, Page), fixtures,
test isolation, web-first assertions, configuration, reports, and Trace Viewer.

## Tech Stack

Playwright Test + TypeScript

## How to Run

    npm ci
    npx playwright install
    cp .env.example .env
    npx playwright test
    npx playwright show-report

## Environment Variables

`BASE_URL` — the application URL. For this assignment:

    http://104.168.59.50

## Project Structure

`tests/auth.spec.ts` — three registration tests and three login tests.
