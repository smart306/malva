const CARTKEY = "cart";

function normalizeCartItem(item) {
  const productId = String(item?._id || item?.id || "");
  if (!productId) {
    return null;
  }

  return {
    _id: productId,
    title: item?.title || "Без назви",
    price: Number(item?.price) || 0,
    image: typeof item?.image === "string" ? item.image : "",
    quantity: Math.max(1, Number(item?.quantity) || 1),
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

export function addToCart(product) {
  const cart = getCart();

  const productId = String(product._id || product.id || "");
  if (!productId) {
    return cart;
  }

  const exitingProduct = cart.find((item) => item._id === productId);

  if (exitingProduct) {
    exitingProduct.quantity += 1;
  } else {
    cart.push({
      _id: productId,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.images?.[1] || "",
      quantity: 1,
    });
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

export function changeCartQuantity(productId, delta = 1) {
  const normalizedId = String(productId);
  const cart = getCart()
    .map((item) => {
      if (item._id === normalizedId) {
        return {
          ...item,
          quantity: item.quantity + delta,
        };
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
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
