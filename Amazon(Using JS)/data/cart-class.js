class Cart{

  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  #loadFromStorage(){
    this.cartItems  = JSON.parse(localStorage.getItem(this.#localStorageKey))
    if(!this.cartItems){
      this.cartItems = [{
        id:'8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity:1,
        deliveryOptionId:'1'
      },{
        id:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity:1,
        deliveryOptionId:'2'
      }];
    }
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId){
    let matchingItem;
      this.cartItems.forEach((cartObject)=>{
        if(cartObject.id === productId){
          matchingItem = cartObject;
        }
      });
      if(matchingItem){
        matchingItem.quantity+=1;
      }
      else{
        this.cartItems.push({
          id: `${productId}`,
          quantity:1,
          deliveryOptionId:'1'
        });
      }
      this.saveToStorage();
  }

  removeFromCart(productId){
    this.cartItems.forEach((cartObject,index)=>{
      if(cartObject.id === productId){
        this.cartItems.splice(index,1);
        this.saveToStorage();
      }
    });
  }

  updateDeliveryDate(productId,deliveryId){
    let matchingElement;
    this.cartItems.forEach((cartObject)=>{
      if(cartObject.id === productId){
        matchingElement = cartObject;
      }
    });
    matchingElement.deliveryOptionId = deliveryId;
    this.saveToStorage();
  }
}

const cart = new Cart('cart-oops');
const businessCart = new Cart('cart-business');

businessCart.addToCart('dd82ca78-a18b-4e2a-9250-31e67412f98d');


/*export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart  = JSON.parse(localStorage.getItem('cart')) 
  if(!cart){
    cart = [{
      id:'8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
      quantity:1,
      deliveryOptionId:'1'
    },{
      id:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
      quantity:1,
      deliveryOptionId:'2'
    }];
  }
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;
    cart.forEach((cartObject)=>{
      if(cartObject.id === productId){
        matchingItem = cartObject;
      }
    });
    if(matchingItem){
      matchingItem.quantity+=1;
    }
    else{
      cart.push({
        id: `${productId}`,
        quantity:1,
        deliveryOptionId:'1'
      });
    }
    saveToStorage();
}
export function removeFromCart(productId){
  cart.forEach((cartObject,index)=>{
    if(cartObject.id === productId){
      cart.splice(index,1);
      saveToStorage();
    }
  });
}

export function updateDeliveryDate(productId,deliveryId){
  let matchingElement;
  cart.forEach((cartObject)=>{
    if(cartObject.id === productId){
      matchingElement = cartObject;
    }
  });
  matchingElement.deliveryOptionId = deliveryId;
  saveToStorage();
}*/
