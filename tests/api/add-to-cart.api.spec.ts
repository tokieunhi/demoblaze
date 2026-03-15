import { test, expect } from '@playwright/test';
import { addProductToCart, viewCart } from '../../api/cart.api';
import { userData, productData } from '../../data';
import { resetCart } from '../../api/cart.api';
import { AddToCartPayload } from '../../api/types';

const user = userData.validData.users[2];
const product = productData.products[8];

test.describe('API - Add to Cart', () => {
  test.beforeEach(async ({ request }) => {
    await resetCart(request, user.userName);
  });

  test('Add product to cart successfully', async ({ request }) => {
    const payload: AddToCartPayload = {
      token: user.token,
      productId: product.id,
    };
    const resp = await addProductToCart(request, payload);
    expect(resp.status()).toBe(200);

    const viewCartResponse = await viewCart(request, user.token);
    expect(viewCartResponse.status()).toBe(200);
    const viewCartResponseBody = await viewCartResponse.json();
    expect(viewCartResponseBody.Items).toHaveLength(1);
    expect(viewCartResponseBody.Items[0].prod_id).toBe(product.id);
  });

  test.afterEach(async ({ request }) => {
    await resetCart(request, user.userName);
  });
});
