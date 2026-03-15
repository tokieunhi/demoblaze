import { test, expect } from '@playwright/test';
import { addProductToCart, resetCart } from '../../api/cart.api';
import { userData, productData } from '../../data';

const user = userData.validData.validAccount;
const product = productData.products[0];

test.describe('API - Create Order', () => {
  test('Create order successfully', async ({ request }) => {
    await addProductToCart(request, {token: user.token, productId: product.id});
    const response = await resetCart(request, user.userName);
    expect(response.status()).toBe(200);
  });
});
