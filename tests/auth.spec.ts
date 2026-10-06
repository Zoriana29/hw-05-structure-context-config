import { test, expect } from '@playwright/test';

// Demo account shown on the sign-in page — always exists in the app
const EXISTING_USER = {
  email: 'olena@example.com',
  password: 'password',
};

// Generates unique data so repeated and parallel runs never collide
function newUser() {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    username: `student${id}`,
    email: `student${id}@example.com`,
    password: 'ValidPassword123!',
  };
}

test.describe('Registration', { tag: '@auth' }, () => {
  // Shared precondition: every test in this group starts on the registration page
  test.beforeEach(async ({ page }) => {
    await page.goto('/articles/register');
  });

  test('REG-1 user registers with unique credentials and lands in a signed-in state', async ({ page }) => {
    // Arrange
    const user = newUser();

    // Act
    await page.getByTestId('auth-username').fill(user.username);
    await page.getByTestId('auth-email').fill(user.email);
    await page.getByTestId('auth-password').fill(user.password);
    await page.getByTestId('register-confirm-password').fill(user.password);
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Assert: the username appears in the navigation
    await expect(page.getByTestId('nav-profile')).toContainText(user.username);
    await expect(page.getByTestId('nav-sign-up')).toBeHidden();
  });

  test('REG-2 registration with an already taken email shows an error', async ({ page }) => {
    // Arrange: a new username, but an email that already belongs to the demo account
    const user = newUser();

    // Act
    await page.getByTestId('auth-username').fill(user.username);
    await page.getByTestId('auth-email').fill(EXISTING_USER.email);
    await page.getByTestId('auth-password').fill(user.password);
    await page.getByTestId('register-confirm-password').fill(user.password);
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Assert: exact message from the app, no account created
    await expect(page.getByText('body email або username вже зайняті')).toBeVisible();
    await expect(page).toHaveURL(/\/articles\/register/);
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();
  });

  test('REG-3 registration without an email does not create an account', async ({ page }) => {
    // Arrange: every field filled except the email
    const user = newUser();

    // Act
    await page.getByTestId('auth-username').fill(user.username);
    await page.getByTestId('auth-password').fill(user.password);
    await page.getByTestId('register-confirm-password').fill(user.password);
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Assert: validation message, still on the same page, still a guest
    await expect(page.getByText('email некоректний email')).toBeVisible();
    await expect(page).toHaveURL(/\/articles\/register/);
    await expect(page.getByTestId('nav-sign-up')).toBeVisible();
  });
});

test.describe('Login', { tag: '@auth' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/articles/login');
  });

  test('LOGIN-1 existing user signs in with the correct password', async ({ page }) => {
    // Act
    await page.getByTestId('auth-email').fill(EXISTING_USER.email);
    await page.getByTestId('auth-password').fill(EXISTING_USER.password);
    await page.getByTestId('auth-submit').click();

    // Assert: signed-in state
    await expect(page.getByTestId('nav-profile')).toBeVisible();
    await expect(page.getByTestId('nav-sign-in')).toBeHidden();
  });

  test('LOGIN-2 sign in with a wrong password is rejected', async ({ page }) => {
    // Act: existing email, wrong password
    await page.getByTestId('auth-email').fill(EXISTING_USER.email);
    await page.getByTestId('auth-password').fill('WrongPassword999!');
    await page.getByTestId('auth-submit').click();

    // Assert: error is shown and no session is created
    await expect(page.getByText('email or password неправильні')).toBeVisible();
    await expect(page.getByTestId('nav-sign-in')).toBeVisible();
  });

  test('LOGIN-3 sign in with a non-existent email is rejected', async ({ page }) => {
    // Arrange: an email that was never registered
    const ghost = newUser();

    // Act
    await page.getByTestId('auth-email').fill(ghost.email);
    await page.getByTestId('auth-password').fill(ghost.password);
    await page.getByTestId('auth-submit').click();

    // Assert: same generic error, user stays unauthenticated
    await expect(page.getByText('email or password неправильні')).toBeVisible();
    await expect(page.getByTestId('nav-sign-in')).toBeVisible();
  });
});