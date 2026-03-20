import { test, expect } from '../../fixtures/page.fixtures';
import { orderData, userData, productData } from '../../data';
import { CartService } from '../../api/services/cart.service';
import { AuthService } from '../../api/services/auth.service';
import { IOrderDetails, IUser } from '../../data/types';

const orderDetails: IOrderDetails = orderData.placeOrder;
const user = userData.validData.users[1];
const product = productData.products[0];

const cartService = new CartService();
const authService = new AuthService();
let token: string;

test.describe('Complete purchase', () => {
  test.beforeEach(async () => {
    token = await authService.generateToken(user.userName, user.password);
    const deleteCartResponse = await cartService.deleteCart(token);
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

    // Fill order details and click purchase button
    await placeOrderModal.fillOrderDetails(orderDetails);
    await placeOrderModal.clickPurchaseButton();

    // Get and verify confirmation details from thank you modal
    const message = await purchaseConfirmationModal.getSuccessMessage();
    const infoBlock = await purchaseConfirmationModal.confirmationDetailsBlock.textContent();
    expect(message).toContain('Thank you for your purchase');
    expect(infoBlock).toContain(orderDetails.name);
    expect(infoBlock).toContain(orderDetails.credit_card);
    expect(infoBlock).toContain(product.price.toString());

    // Close modal
    await purchaseConfirmationModal.clickOk();
  });
});
