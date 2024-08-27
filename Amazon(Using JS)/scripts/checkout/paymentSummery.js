import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrencey} from '../../utils/money.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentDetails(){
  let paymentSummeryHTML='';
  let itemsValue = 0;
  let totalCartQuantity = 0;
  let shippingAndHandlingCost = 0;
  
  cart.cartItems.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    itemsValue += cartItem.quantity*product.priceCents;
    totalCartQuantity += cartItem.quantity;
    shippingAndHandlingCost += deliveryOption.priceCents;    
  });
  const totalBeforeTax = shippingAndHandlingCost+itemsValue;
  const estimatedTax = totalBeforeTax*0.1;
  let orderTotal = totalBeforeTax+estimatedTax;
  paymentSummeryHTML += `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${totalCartQuantity}):</div>
    <div class="payment-summary-money">$${formatCurrencey(itemsValue)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrencey(shippingAndHandlingCost)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrencey(totalBeforeTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrencey(estimatedTax)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrencey(orderTotal)}</div>
  </div>

  <button class="place-order-button button-primary
  js-place-your-order
  ">
    Place your order
  </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummeryHTML;
  
  //document.querySelector('.js-header-quantity').innerHTML = `${totalCartQuantity} items`;

  document.querySelector('.js-place-your-order').addEventListener('click',async()=>{
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItems
        }) 
      });
      const order = await response.json();
      addOrder(order);
    }
    catch(error){
      console.log("Unexpected Error.\nPlease try again 😊");
    }
    window.location.href='orders.html';
  });
}
