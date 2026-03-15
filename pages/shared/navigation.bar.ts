import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Navigation bar component shared across pages.
 */
export class NavigationBar extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly usernameLink = this.page.locator('#nameofuser');
  readonly cartLink = this.page.locator('#cartur');
  readonly loginLink = this.page.locator('#login2');
  readonly logoutLink = this.page.locator('#logout2');

  async waitForUserNameVisible(): Promise<void> {
    await this.waitForVisible(this.usernameLink);
  }

  async getUsername(): Promise<string | null> {
    await this.waitForUserNameVisible();
    const text = await this.usernameLink.textContent();
    return text ?? null;
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openLoginModal(): Promise<void> {
    await this.loginLink.click();
  }
}
