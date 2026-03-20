import { test, expect } from '@playwright/test';
import { userData, productData } from '../../data';
import { CartService } from '../../api/services/cart.service';
import { AuthService } from '../../api/services/auth.service';
import { AddToCartPayload, AddToCartResponse } from '../../api/types';
import { StatusCode } from '../../api/enum';

const user = userData.validData.users[0];
const product = productData.products[8];

const cartService = new CartService();
const authService = new AuthService();
let token: string;

test.describe('API - Add to Cart', () => {
  test.beforeEach(async () => {
    token = await authService.generateToken(user.userName, user.password);
  });

  test('Add product to cart successfully', async () => {
    const addToCartResponse = await cartService.addProductToCart({
      id: crypto.randomUUID(),
      cookie: token,
      prod_id: product.id
    } as AddToCartPayload);

    expect(addToCartResponse.status()).toBe(StatusCode.OK);

    // Verify product appears in cart via viewcart
    const viewCartResponse = await cartService.viewCart(token);
    expect(viewCartResponse.status()).toBe(200);
    const viewCartResponseBody = await viewCartResponse.json();
    expect(viewCartResponseBody.Items[0].prod_id).toBe(product.id);
    expect(viewCartResponseBody.Items[0].cookie).toBe(token);
  });

  test('Add product to cart successfully with flag = `false`', async () => {
    const addToCartResponse = await cartService.addProductToCart({
      id: crypto.randomUUID(),
      cookie: token,
      prod_id: product.id,
      flag: false,
    } as AddToCartPayload);
    expect(addToCartResponse.status()).toBe(StatusCode.OK);

    // Verify product appears in cart via viewcart
    const viewCartResponse = await cartService.viewCart(token);
    expect(viewCartResponse.status()).toBe(200);
    const viewCartResponseBody = await viewCartResponse.json();
    expect(viewCartResponseBody.Items[0].prod_id).toBe(product.id);
    expect(viewCartResponseBody.Items[0].cookie).toBe(token);
  });

  test('Add product to cart unsuccessfully with invalid token', async () => {
    const resp = await cartService.addProductToCart({
      cookie: 'invalid-token',
      prod_id: product.id,
    });
    expect(resp.status()).toBe(StatusCode.OK);

    const respBody: AddToCartResponse = await resp.json();
    expect(respBody.errorMessage).toEqual('Bad parameter, token malformed.');
  });

  test('Add product to cart unsuccessfully with empty token', async () => {
    const resp = await cartService.addProductToCart({
      cookie: '',
      prod_id: product.id,
    });
    expect(resp.status()).toBe(StatusCode.INTERNAL_ERROR);
  });
});
