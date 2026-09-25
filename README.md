# ДЗ 5 — Playwright: structure, browser, context, page, reporting, config

Тести реєстрації та входу для навчального застосунку QA Dojo (Conduit).

Застосунок: http://104.168.59.50

## Тема розділу
Архітектура Playwright (Browser, BrowserContext, Page), fixtures,
ізоляція тестів, web-first assertions, конфігурація, звіти, Trace Viewer.

## Стек
Playwright Test + TypeScript

## Запуск
    npm ci
    npx playwright install
    cp .env.example .env
    npx playwright test
    npx playwright show-report

## Змінні середовища
BASE_URL — адреса застосунку. Для цього завдання: http://104.168.59.50

## Структура
tests/auth.spec.ts — три тести реєстрації і три тести входу.
