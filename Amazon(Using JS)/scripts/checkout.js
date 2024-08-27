import {renderCheckoutPage} from './checkout/orderSummery.js';
import {renderPaymentDetails} from './checkout/paymentSummery.js';
import {loadProducts,loadProductsFetch, products} from '../data/products.js';
import {loadCart} from '../data/cart.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';

async function loadPage(){
  try{
    //throw 'error';
    await loadProductsFetch();
    await new Promise((resolve,reject)=>{
      //throw 'error2';
     loadCart(()=>{
      //reject('error4');
      //throw 'error3'; (throw doesnt work as its in call back which is called in future)
      resolve();
    });
    });
   }
  catch{
    console.log("Unexpected Error.\nPlease try again 😊");
  }
   
   renderCheckoutPage();
   renderPaymentDetails();  
}
loadPage().then(()=>{console.log('Displayed')});
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
    resolve();
    });
  })
]).then(()=>{
  renderCheckoutPage();
  renderPaymentDetails();
});
*/

/*Using call-back which increases nesting of code
loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutPage();
    renderPaymentDetails();  
  })
});
*/