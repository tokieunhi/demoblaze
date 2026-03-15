import { test, expect } from '../../fixtures/page.fixtures';
import { addProductToCart, resetCart } from '../../api/cart.api';
import { userData, productData } from '../../data';
import { AddToCartPayload } from '../../api/types';

const user = userData.validData.validAccount;
const product = productData.products[0];

test.describe('UI - Remove product from cart', () => {
  test.beforeEach(async ({ request }) => {
    // Clear cart before test
    await resetCart(request, user.userName);
    // Add product to cart
    const payload: AddToCartPayload = {
      token: user.token,
      productId: product.id,
    };
    await addProductToCart(request, payload);
  });

  test('should remove product from cart', async ({
    homePage,
    loginModal,
    cartPage,
    navigationBar,
  }) => {
    await homePage.goto();
    await navigationBar.openLoginModal();
    await loginModal.login(user);
    await navigationBar.waitForUserNameVisible();

    await navigationBar.goToCart();
    await cartPage.removeProduct(product.name);
    await expect(cartPage.productRowByProductName(product.name)).toHaveCount(0);
  });

  test.afterEach(async ({ request }) => {
    await resetCart(request, user.userName);
  });
});
