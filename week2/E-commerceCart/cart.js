
        //   ii. cart.js - Shopping cart operations
        //                   import { getProductById, checkStock } from './product.js';
                          
        //                   let cartItems = [];
                          
        //                   // TODO: Implement these functions
                          
        //                   export function addToCart(productId, quantity) {
        //                     // 1. Get product details
        //                     // 2. Check stock availability
        //                     // 3. Check if product already in cart
        //                     //    - If yes, update quantity
        //                     //    - If no, add new item
        //                     // 4. Return success/error message
        //                   }
                          
        //                   export function removeFromCart(productId) {
        //                     // Remove product from cart
        //                   }
                          
        //                   export function updateQuantity(productId, newQuantity) {
        //                     // Update quantity of product in cart
        //                     // Check stock before updating
        //                   }
                          
        //                   export function getCartItems() {
        //                     // Return all cart items with product details
        //                   }
                          
        //                   export function getCartTotal() {
        //                     // Calculate total price of all items in cart
        //                     // Return total
        //                   }
                          
        //                   export function clearCart() {
        //                     // Empty the cart
        //                   }

import { getProductById, checkStock } from './product.js';

let cartItems = [];


// 1. Get product details
// 2. Check stock availability
// 3. Check if product already in cart
//    - If yes, update quantity
//    - If no, add new item
// 4. Return success/error message
function addToCart(productId, quantity) {

  const product = getProductById(productId);

  if (!product) {
    return "Product not found";
  }

  const stockAvailable = checkStock(productId, quantity);

  if (!stockAvailable) {
    return "Not enough stock";
  }

  const existingItem = cartItems.find(item => item.productId === productId);

  if (existingItem) {

    existingItem.quantity += quantity;

  } else {

    cartItems.push({
      productId: productId,
      quantity: quantity
    });

  }

  return "Product added to cart";
}



// Remove product from cart
function removeFromCart(productId) {

  cartItems = cartItems.filter(item => item.productId !== productId);

  return "Item removed from cart";

}



// Update quantity of product in cart
// Check stock before updating
function updateQuantity(productId, newQuantity) {

  const stockAvailable = checkStock(productId, newQuantity);

  if (!stockAvailable) {
    return "Not enough stock";
  }

  const item = cartItems.find(item => item.productId === productId);

  if (!item) {
    return "Product not in cart";
  }

  item.quantity = newQuantity;

  return "Quantity updated";

}



// Return all cart items with product details
function getCartItems() {

  const items = cartItems.map(item => {

    const product = getProductById(item.productId);

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    };

  });

  return items;

}



// Calculate total price of all items in cart
// Return total
function getCartTotal() {

  const total = cartItems.reduce((sum, item) => {

    const product = getProductById(item.productId);

    return sum + product.price * item.quantity;

  }, 0);

  return total;

}



// Empty the cart
function clearCart() {

  cartItems = [];

  return "Cart cleared";

}


export {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCartItems,
  getCartTotal,
  clearCart
};