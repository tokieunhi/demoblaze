import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Product detail page object for DemoBlaze.
 */
export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly addToCartBtn = this.page.getByRole('link', { name: 'Add to cart' });

  async clickAddToCartButton(): Promise<void> {
    await this.addToCartBtn.click();
    await this.acceptDialog();
  }
}
