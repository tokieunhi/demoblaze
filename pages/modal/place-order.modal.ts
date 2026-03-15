import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { config } from '../../config/env.config';
import { IOrderDetails } from '../../data/types';

/**
 * Place Order modal component.
 */
export class PlaceOrderModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly modal = this.page.locator('#orderModal');
  readonly nameInput = this.page.locator('#name');
  readonly countryInput = this.page.locator('#country');
  readonly cityInput = this.page.locator('#city');
  readonly cardInput = this.page.locator('#card');
  readonly monthInput = this.page.locator('#month');
  readonly yearInput = this.page.locator('#year');
  readonly purchaseButton = this.page.locator('button:has-text("Purchase")');

  async waitForModalVisible(): Promise<void> {
    await this.waitForVisible(this.modal);
  }

  async inputName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async inputCountry(country: string): Promise<void> {
    await this.countryInput.fill(country);
  }

  async inputCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
  }

  async inputCard(card: string): Promise<void> {
    await this.cardInput.fill(card);
  }

  async inputMonth(month: string): Promise<void> {
    await this.monthInput.fill(month);
  }

  async inputYear(year: string): Promise<void> {
    await this.yearInput.fill(year);
  }

  async clickPurchaseButton(): Promise<void> {
    await this.purchaseButton.click();
  }

  async fillOrderDetails(details: IOrderDetails): Promise<void> {
    await this.waitForModalVisible();
    await this.inputName(details.name);
    await this.inputCountry(details.country);
    await this.inputCity(details.city);
    await this.inputCard(details.credit_card);
    await this.inputMonth(details.month);
    await this.inputYear(details.year);
  }
}
