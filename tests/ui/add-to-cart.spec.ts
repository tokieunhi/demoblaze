import { test, expect } from '../../fixtures/page.fixtures';
import { resetCart } from '../../api/cart.api';
import { userData, productData } from '../../data';

const user = userData.validData.validAccount;
const product = productData.products[1];

test.describe('UI - Add to Cart', () => {
  test.beforeEach(async ({ request }) => {
    await resetCart(request, user.userName);
  });

  test('Add product to cart successfully', async ({
    homePage,
    navigationBar,
    loginModal,
    productPage,
    cartPage,
  }) => {
    await homePage.goto();
    await navigationBar.openLoginModal();
    await loginModal.login(user);

    await homePage.clickProductCard(product.name);
    await productPage.clickAddToCartButton();

    await cartPage.goto();
    expect(await cartPage.isProductInCart(product.name)).toBe(true);
  });

  test.afterEach(async ({ request }) => {
    await resetCart(request, user.token!);
  });
});