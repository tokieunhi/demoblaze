import { test, expect } from '../../fixtures/page.fixtures';
import { CartService } from '../../api/services/cart.service';
import { AuthService } from '../../api/services/auth.service';
import { userData, productData } from '../../data';

const user = userData.validData.validAccount;
const product = productData.products[0];

const cartService = new CartService();
const authService = new AuthService();
let token: string;

test.describe('Remove product', () => {
  test.beforeEach(async () => {
    token = await authService.generateToken(user.userName, user.password);
    const deleteCartResponse = await cartService.deleteCart(token);
    const addToCartResponse = await cartService.addProductToCart({
      cookie: token,
      prod_id: product.id,
    });
  });

  test('Remove product from cart successfully', async ({
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
});
