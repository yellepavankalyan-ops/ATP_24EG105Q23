//       Assignment 2: 
// -------------
// E-Commerce Shopping Cart System :
//       Building a shopping cart like Amazon or Flipkart

// Requirements:
//       Create a modular shopping system with 5 files:

//            i. product.js - Product catalog
//                           // Product database (simulated)
//                           const products = [
//                             { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
//                             { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
//                             { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
//                             { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
//                             { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
//                           ];
                          
//                           // TODO: Implement these functions
                          
//                           export function getProductById(id) {
//                             // Find and return product by ID
//                           }
                          
//                           export function getAllProducts() {
//                             // Return all products
//                           }
                          
//                           export function getProductsByCategory(category) {
//                             // Filter products by category
//                           }
                          
//                           export function searchProducts(query) {
//                             // Search products by name (case-insensitive)
//                           }
                          
//                           export function checkStock(productId, quantity) {
//                             // Check if product has enough stock
//                             // Return true/false
//                           }
                          
//                           export function reduceStock(productId, quantity) {
//                             // Reduce product stock after purchase
//                           }

// Product database (simulated)
const products = [
  { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
  { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
  { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
  { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
  { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
];


// Find and return product by ID
function getProductById(id) {

  const product = products.find(p => p.id === id);

  return product;

}


// Return all products
function getAllProducts() {

  return products;

}


// Filter products by category
function getProductsByCategory(category) {

  const result = products.filter(p => p.category === category);

  return result;

}


// Search products by name (case-insensitive)
function searchProducts(query) {

  const result = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return result;

}


// Check if product has enough stock
function checkStock(productId, quantity) {

  const product = products.find(p => p.id === productId);

  if (!product) {
    return false;
  }

  return product.stock >= quantity;

}


// Reduce product stock after purchase
function reduceStock(productId, quantity) {

  const product = products.find(p => p.id === productId);

  if (product) {
    product.stock = product.stock - quantity;
  }

}


// export functions
export {
  getProductById,
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  checkStock,
  reduceStock
};
