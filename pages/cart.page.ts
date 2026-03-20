import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { URL_PATH } from '../constants/url-path';

/**
 * Cart page object for DemoBlaze.
 */
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly cartTable = this.page.locator('#tbodyid');
  readonly productRowByProductName = (productName: string) =>
    this.cartTable.locator('tr').filter({ hasText: productName });
  readonly firstProductRowByName = (productName: string) =>
    this.productRowByProductName(productName).first();
  readonly deleteButton = (productName: string) =>
    this.firstProductRowByName(productName).locator('a').last();
  readonly placeOrderButton = this.page.locator('button:has-text("Place Order")');

  async goto(): Promise<void> {
    await this.page.goto(URL_PATH.CART);
  }

  async waitForProductInCart(productName: string): Promise<void> {
    await this.waitForVisible(this.firstProductRowByName(productName), 10000);
  }

  async removeProduct(productName: string): Promise<void> {
    await this.waitForVisible(this.firstProductRowByName(productName), 10000);
    await this.deleteButton(productName).click();
  }

  async clickPlaceOrderButton(): Promise<void> {
    await this.placeOrderButton.click();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const row = this.productRowByProductName(productName).first();
    await this.waitForVisible(row);
    return row.isVisible();
  }
}
