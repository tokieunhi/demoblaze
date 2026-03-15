import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { IUser } from '../../data/types';

/**
 * Login modal page object for DemoBlaze.
 */
export class LoginModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly userNameInput = this.page.locator('#loginusername');
  readonly passwordInput = this.page.locator('#loginpassword');
  readonly loginBtn = this.page.locator('#logInModal button:has-text("Log in")');

  async inputUsername(username: string): Promise<void> {
    await this.userNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.userNameInput.fill(username);
  }

  async inputPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginBtn(): Promise<void> {
    await this.loginBtn.click();
  }

  async login(user: IUser): Promise<void> {
    await this.inputUsername(user.userName);
    await this.inputPassword(user.password);
    await this.clickLoginBtn();
  }
}
