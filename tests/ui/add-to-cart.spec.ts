import { test, expect } from '../../fixtures/page.fixtures';
import { CartService } from '../../api/services/cart.service';
import { AuthService } from '../../api/services/auth.service';
import { userData, productData } from '../../data';

const user = userData.validData.validAccount;
const product = productData.products[1];

const cartService = new CartService();
const authService = new AuthService();
let token: string;

test.describe('Add to Cart', () => {
  test.beforeEach(async () => {
    token = await authService.generateToken(user.userName, user.password);
    const addToCartResponse = await cartService.addProductToCart({
      cookie: token,
      prod_id: product.id,
    });
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

  test.afterEach(async () => {
    await cartService.deleteCart(token);
  });
});
