
const CARTKEY = "cart";

function normalizeCartItem(item) {
  const productId = String(item._id);
  if (!productId) {
    return null;
  }
  const quantity = Number(item.quantity);
  if (quantity <= 0) {
    return null;
  }

  return {
    _id: productId,
    title: item.title,
    maincategory: item.maincategory,
    price: Number(item.price),
    image: item.image,
    color: item.color || null,
    quantity: Math.max(1, quantity),
    stock: Number(item.stock),
  };
}

export function getCart() {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CARTKEY);

  const parsedCart = cart ? JSON.parse(cart) : [];
  const normalizedCart = Array.isArray(parsedCart)
    ? parsedCart.map(normalizeCartItem).filter(Boolean)
    : [];

  if (cart && JSON.stringify(parsedCart) !== JSON.stringify(normalizedCart)) {
    saveCart(normalizedCart);
  }

  return normalizedCart;
}

export function saveCart(cart) {
  localStorage.setItem(CARTKEY, JSON.stringify(cart));
}

export function addToCart(product, color) {
  const cart = getCart();

  const productId = String(product._id);
  if (!productId) return cart;

  const existingProduct = cart.find((item) => item._id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    if (color) {
      cart.push({
        _id: productId,
        title: product.title,
        maincategory: product.maincategory,
        price: product.price,
        image: product.images[0].image,
        color: color,
        quantity: 1,
        stock: product.quantity,
      });
    } else {
      cart.push({
        _id: productId,
        title: product.title,
        maincategory: product.maincategory,
        price: product.price,
        image: product.images[0].image,
        quantity: 1,
        stock: product.quantity,
      });
    }
  }
  saveCart(cart);
  return cart;
}

export function removeCart(productId) {
  const normalizedId = String(productId);
  const cart = getCart().filter((item) => item._id !== normalizedId);

  saveCart(cart);
  return cart;
}

export function changeCartQuantity(productId, delta) {
  const normalizedId = String(productId);
  const cart = getCart()
    .map((item) => {
      if (item._id === normalizedId) {
        if (item.maincategory === "decor") {
          return {
            ...item,
            quantity: item.quantity + delta
          };
        } else {
          return {
            ...item,
            quantity: item.quantity + delta
          };
        }
      }
      return item;
    })
    .filter((item) => item.quantity > 0);

  saveCart(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CARTKEY);
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    return total + (Number(item.price)) * (Number(item.quantity));
  }, 0); 
}
