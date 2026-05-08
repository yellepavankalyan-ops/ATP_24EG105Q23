        //   iii. discount.js - Coupon and discount logic
        //                   // Available coupons
        //                   const coupons = {
        //                     'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
        //                     'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
        //                     'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
        //                   };
                          
        //                   // TODO: Implement these functions
                          
        //                   export function validateCoupon(couponCode, cartTotal, cartItems) {
        //                     // 1. Check if coupon exists
        //                     // 2. Check minimum amount requirement
        //                     // 3. Check category requirement (if any)
        //                     // Return { valid: true/false, message: '...' }
        //                   }
                          
        //                   export function calculateDiscount(couponCode, cartTotal) {
        //                     // Calculate discount amount based on coupon type
        //                     // Return discount amount
        //                   }
                          
        //                   export function applyDiscount(cartTotal, couponCode, cartItems) {
        //                     // 1. Validate coupon
        //                     // 2. If valid, calculate discount
        //                     // 3. Return final amount and discount details
        //                     // Return { 
        //                     //   originalTotal: ..., 
        //                     //   discount: ..., 
        //                     //   finalTotal: ...,
        //                     //   message: '...'
        //                     // }
        //                   }

// Available coupons
const coupons = {
  'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
  'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
  'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
};



// 1. Check if coupon exists
// 2. Check minimum amount requirement
// 3. Check category requirement (if any)
// Return { valid: true/false, message: '...' }
function validateCoupon(couponCode, cartTotal, cartItems) {

  const coupon = coupons[couponCode];

  // check coupon exists
  if (!coupon) {
    return { valid: false, message: "Invalid coupon code" };
  }

  // check minimum cart value
  if (cartTotal < coupon.minAmount) {
    return { valid: false, message: "Minimum amount not reached" };
  }

  // check category requirement
  if (coupon.category) {

    const hasCategory = cartItems.some(item => item.category === coupon.category);

    if (!hasCategory) {
      return { valid: false, message: "Coupon only valid for electronics products" };
    }

  }

  return { valid: true, message: "Coupon applied" };

}



// Calculate discount amount based on coupon type
// Return discount amount
function calculateDiscount(couponCode, cartTotal) {

  const coupon = coupons[couponCode];

  if (!coupon) {
    return 0;
  }

  if (coupon.type === "percentage") {

    return (cartTotal * coupon.value) / 100;

  }

  if (coupon.type === "flat") {

    return coupon.value;

  }

  return 0;

}



// 1. Validate coupon
// 2. If valid, calculate discount
// 3. Return final amount and discount details
function applyDiscount(cartTotal, couponCode, cartItems) {

  const validation = validateCoupon(couponCode, cartTotal, cartItems);

  if (!validation.valid) {

    return {
      originalTotal: cartTotal,
      discount: 0,
      finalTotal: cartTotal,
      message: validation.message
    };

  }

  const discount = calculateDiscount(couponCode, cartTotal);

  const finalTotal = cartTotal - discount;

  return {
    originalTotal: cartTotal,
    discount: discount,
    finalTotal: finalTotal,
    message: "Discount applied successfully"
  };

}


export {
  validateCoupon,
  calculateDiscount,
  applyDiscount
};