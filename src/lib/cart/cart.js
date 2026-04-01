const CARTKEY = "cart";

export function getCart(){
    if (typeof window === "undefined") return []; 

    const cart = localStorage.getItem(CARTKEY); 

    return cart ? JSON.parse(cart) : []; 
}

export function saveCart(cart){
    localStorage.setItem(CARTKEY, JSON.stringify(cart))
}

export function addToCart(product){
    const cart = getCart(); 

    const exitingProduct = cart.find((item) => (item.id === product.id)); 

    if (exitingProduct) {
        exitingProduct.quantity+=1
    } else {
        cart.push({
            id: product.id,
            title: product.title, 
            price: product.price, 
            image: product.images?.[1] || "", 
            quantity: 1
        })
    }
    saveCart(cart) 
    return cart
}

export function removeCart(productId){
    const cart = getCart().filter((item) => item.id !== productId); 

    saveCart(cart)
    return cart
}

export function changeCartQuantity(productId, delta = 1){
    const cart = getCart()
      .map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + delta,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0)

      saveCart(cart)
      return cart
}

export function clearCart(){
    localStorage.removeItem(CARTKEY)
}

export function getCartTotal(){
    const cart = getCart(); 
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}