import { test, expect } from '../../fixtures/page.fixtures';
import { orderData, userData, productData } from '../../data';
import { resetCart } from '../../api/cart.api';
import { IOrderDetails, IUser } from '../../data/types';

const orderDetails: IOrderDetails = orderData.placeOrder;
const user: IUser = userData.validData.users[1];
const product = productData.products[0];

test.describe('UI - Complete Purchase', () => {
  test.beforeEach(async ({ request }) => {
    await resetCart(request, user.userName);
  });

  test('Purchase product successfully', async ({
    homePage,
    loginModal,
    cartPage,
    productPage,
    placeOrderModal,
    purchaseConfirmationModal,
    navigationBar
  }) => {
    await homePage.goto();
    await navigationBar.openLoginModal();
    await loginModal.login(user);
    await navigationBar.waitForUserNameVisible();

    await homePage.clickProductCard(product.name);
    await productPage.clickAddToCartButton();
    await navigationBar.goToCart();
    await cartPage.waitForProductInCart(product.name);
    await cartPage.clickPlaceOrderButton();

    // 1. Fill order details and click purchase button
    await placeOrderModal.fillOrderDetails(orderDetails);
    await placeOrderModal.clickPurchaseButton();

    // 2. Get and verify confirmation details from thank you modal
    const message = await purchaseConfirmationModal.getSuccessMessage();
    const infoBlock = await purchaseConfirmationModal.confirmationDetailsBlock.textContent();
    expect(message).toContain('Thank you for your purchase');
    expect(infoBlock).toContain(orderDetails.name);
    expect(infoBlock).toContain(orderDetails.credit_card);
    expect(infoBlock).toContain(product.price.toString());

    // 3. Close modal
    await purchaseConfirmationModal.clickOk();
  });
});
