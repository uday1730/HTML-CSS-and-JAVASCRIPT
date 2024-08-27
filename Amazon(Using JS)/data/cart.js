class Cart{

  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  loadFromStorage(){
    this.cartItems  = JSON.parse(localStorage.getItem(this.#localStorageKey))
    if(!this.cartItems){
      this.cartItems = [{
        productId:'8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity:1,
        deliveryOptionId:'1'
      },{
        productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity:1,
        deliveryOptionId:'2'
      }];
    }
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId1){
    let matchingItem;
      this.cartItems.forEach((cartObject)=>{
        if(cartObject.productId === productId1){
          matchingItem = cartObject;
        }
      });
      if(matchingItem){
        matchingItem.quantity+=1;
      }
      else{
        this.cartItems.push({
          productId: `${productId1}`,
          quantity:1,
          deliveryOptionId:'1'
        });
      }
      this.saveToStorage();
  }

  removeFromCart(productId1){
    this.cartItems.forEach((cartObject,index)=>{
      if(cartObject.productId === productId1){
        this.cartItems.splice(index,1);
        this.saveToStorage();
      }
    });
  }

  updateDeliveryDate(productId1,deliveryId){
    let matchingElement;
    this.cartItems.forEach((cartObject)=>{
      if(cartObject.productId === productId1){
        matchingElement = cartObject;
      }
    });
    matchingElement.deliveryOptionId = deliveryId;
    this.saveToStorage();
  }
}
export const cart = new Cart('cart-oops');


export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    console.log(xhr.response);
    fun();
  }); 

  xhr.open('GET','https://supersimplebackend.dev/cart')
  xhr.send();
}