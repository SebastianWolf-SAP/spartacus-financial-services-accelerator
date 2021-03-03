import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as renters from '../../../helpers/checkout/insurance/renters-checkout';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as orderHistory from '../../../helpers/my-account/myAccountPages';

context('Renters Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should be able to register user without phone number', () => {
    register.registerUser(registrationUserWithoutPhone);
    register.loginInUser(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
  });

  it('Should open renters category page', () => {
    checkout.waitConsent();
    checkout.startInsuranceCheckout('Renters');
  });

  it('Should populate first page in checkout', () => {
    checkout.checkCheckoutStep('Your Renters Insurance', '7');
    checkout.checkProgressBarInsurance();
    checkout.checkFirstCheckoutStep('Renters');
    checkout.populatePropertyDetails();
    checkout.populateContentsCover();
    checkout.populatePropertyAddress();
    checkout.clickContinueButton();
  });

  it('Should check comparison table', () => {
    checkout.checkCheckoutStep('Your Renters Insurance', '7');
    checkout.checkInsuranceComparisonPage('2');
    renters.checkRentersComparisonTable();
    renters.selectRentersMonthly();
  });

  it('Should check add options page', () => {
    renters.checkOptionalProducts();
    renters.checkMiniCartRenters();
    checkout.removeOptionalProduct('Bicycles Cover');
    renters.checkMiniCartRentersRemovedProduct();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    checkout.populatePersonalDetailsPage();
  });

  it('Should check quote review page', () => {
    checkout.checkCheckoutStep('Your Renters Insurance', '7');
    checkout.checkProgressBarInsurance();
    renters.checkMiniCartRentersRemovedProduct();
    checkout.clickContinueButton();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
  });

  it('Select default payment details', () => {
    checkout.populatePaymentDetails();
    checkout.populateBillingAddress();
  });

  it('Place order on final review page', () => {
    checkout.placeOrderOnFinalReview();
  });

  it('Check order confirmation', () => {
    checkout.checkAccordions('rentersFinalReview');
    checkout.checkOrderConfirmation();
  });

  it('Should validate phone number and check empty my account pages', () => {
    register.validatePhoneNumber('');
    checkout.checkMyAccountEmptyPages('Claims', 'You have no Claims!');
  });

  it('Check Order history page', () => {
    orderHistory.orderHistoryPage();
    orderHistory.checkOrderHistoryContent('€54.61');
  });
});
