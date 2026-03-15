import { test, expect } from '../../fixtures/page.fixtures';
import { userData } from '../../data';

const user = userData.validData.validAccount;

test.describe('UI - Login', () => {
  test('Login successfully with valid credentials', async ({ homePage, loginModal, navigationBar }) => {
    await homePage.goto();
    await navigationBar.openLoginModal();
    await loginModal.login(userData.validData.validAccount);

    expect(await navigationBar.getUsername()).toContain(user.userName);
  });

  test('Login unsuccessfully with invalid username', async ({ homePage, loginModal, navigationBar }) => {
    await homePage.goto();
    await navigationBar.openLoginModal();
    await loginModal.login(userData.invalidData.invalidUsername);

    const dialogMessage = await homePage.acceptDialog();
    expect(dialogMessage).toContain('User does not exist');
  });

  test('Login unsuccessfully with invalid password', async ({ homePage, loginModal, navigationBar }) => {
    await homePage.goto();
    await navigationBar.openLoginModal();
    await loginModal.login(userData.invalidData.invalidPassword);

    const dialogMessage = await homePage.acceptDialog();
    expect(dialogMessage).toContain('Wrong password');
  });
});
