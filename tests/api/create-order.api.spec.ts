import { test, expect } from '@playwright/test';
import { CartService } from '../../api/services/cart.service';
import { userData, productData } from '../../data';
import { AuthService } from '../../api/services/auth.service';
import { StatusCode } from '../../api/enum';

const user = userData.validData.validAccount;
const product = productData.products[0];
const authService = new AuthService();
let token: string;

const cartService = new CartService();
test.describe('API - Create Order', () => {
  test.beforeEach(async () => {
    token = await authService.generateToken(user.userName, user.password);
    await cartService.addProductToCart({
      cookie: token,
      prod_id: product.id,
    });
  });

  test('Create order successfully', async () => {
    const resp = await cartService.deleteCart(token);
    const respBody = await resp.text();

    expect(resp.status()).toBe(StatusCode.OK);
    expect(respBody).toMatch('Item deleted.');
  });
});
