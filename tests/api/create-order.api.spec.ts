import { test, expect } from '@playwright/test';
import { addProductToCart, resetCart } from '../../api/cart.api';
import { userData, productData } from '../../data';
import { AddToCartPayload } from '../../api/types';

const user = userData.validData.validAccount;
const product = productData.products[0];

test.describe('API - Create Order', () => {
  test('Create order successfully', async ({ request }) => {
    const payload: AddToCartPayload = {
      token: user.token,
      productId: product.id,
    };
    await addProductToCart(request, payload);
    const response = await resetCart(request, user.userName);
    expect(response.status()).toBe(200);
  });
});
