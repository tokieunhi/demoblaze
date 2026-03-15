import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../config/env.config';

/**
 * Home/Store page object for DemoBlaze.
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly productCard = (productName: string) =>
    this.page.getByRole('link', { name: productName });

  async clickProductCard(productName: string): Promise<void> {
    await this.productCard(productName).click();
  }
}
