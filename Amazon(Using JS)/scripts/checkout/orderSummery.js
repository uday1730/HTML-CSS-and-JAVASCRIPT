import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrencey} from '../../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentDetails} from '../checkout/paymentSummery.js';


export function renderCheckoutPage(){
  let cartHtml='';
  cart.cartItems.forEach((cartObject)=>{
  
  let productId = cartObject.productId;
  const matchingItem = getProduct(productId);
  const deliveryOptionId = cartObject.deliveryOptionId;
  const deliveryObject = getDeliveryOption(deliveryOptionId);

  const deliveryDate = dayjs().add(deliveryObject.deliveryDays,'days').format('dddd, MMMM D');

  cartHtml += `<div class="cart-item-container 
  js-cart-item-container
  js-item-container-${matchingItem.id}
  js-cart-element-${matchingItem.id}">
  <div class="delivery-date js-delivery-date">
    Delivery date: ${deliveryDate}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-price">
          ${matchingItem.getPrice()}
        </div>
        <div class="product-quantity
        js-quantity-${matchingItem.id}
        ">
          <span>
            Quantity: <span class="quantity-label">${cartObject.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary
          js-delete-button
          js-delete-button-${matchingItem.id}
          "
          data-delete-button-id=${matchingItem.id}
          >
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${displayDeliveryDate(matchingItem,cartObject)}
      </div>
    </div>
  </div>`;

  document.querySelector('.js-order-summary').innerHTML = cartHtml;

});



function displayDeliveryDate(matchingItem,cartObject){
  let deliveryOptionsHTML = '';
  deliveryOptions.forEach((deliveryOption)=>{

    const deliveryString = deliveryOption.priceCents>0 ? formatCurrencey(deliveryOption.priceCents) : 'FREE';

    const isChecked  = (deliveryOption.id === cartObject.deliveryOptionId) ;


    deliveryOptionsHTML +=`
      <div class="delivery-option js-delivery-option"
      data-product-value-id="${matchingItem.id}"
      data-delivery-id="${deliveryOption.id}"
      >
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date js-best-delivery-date">
            ${dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D')}
          </div>
          <div class="delivery-option-price">
            $${!deliveryString ? `FREE` : deliveryString} - Shipping
          </div>
        </div>
      </div>

    `
  });

  return (deliveryOptionsHTML);
}


document.querySelectorAll('.js-delete-button').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productIdForDelete = link.dataset.deleteButtonId;
      
      cart.removeFromCart(productIdForDelete);

      renderPaymentDetails();

      document.querySelector(`.js-cart-element-${productIdForDelete}`).remove();

  });
});


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    let {productValueId,deliveryId} = element.dataset;
    cart.updateDeliveryDate(productValueId,deliveryId);
    renderCheckoutPage();
    renderPaymentDetails();
  });
});
}