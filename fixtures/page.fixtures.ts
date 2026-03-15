import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginModal } from '../pages/modal/login.modal';
import { PlaceOrderModal } from '../pages/modal/place-order.modal';
import { NavigationBar } from '../pages/shared/navigation.bar';
import { CartPage } from '../pages/cart.page';
import { ProductPage } from '../pages/product.page';
import { PurchaseConfirmationModal } from '../pages/modal/purchase-confirmation.modal';

type PageFixtures = {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  loginModal: LoginModal;
  placeOrderModal: PlaceOrderModal;
  purchaseConfirmationModal: PurchaseConfirmationModal;
  navigationBar: NavigationBar;
};

export const pageFixtures = baseTest.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginModal: async ({ page }, use) => {
    await use(new LoginModal(page));
  },
  placeOrderModal: async ({ page }, use) => {
    await use(new PlaceOrderModal(page));
  },
  navigationBar: async ({ page }, use) => {
    await use(new NavigationBar(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  purchaseConfirmationModal: async ({ page }, use) => {
    await use(new PurchaseConfirmationModal(page));
  },
});

export const test = pageFixtures;
export const expect = baseExpect;
