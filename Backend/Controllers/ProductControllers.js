const asyncHandler = require("express-async-handler");

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  res.status(500).json({ message: "Server error" });
});

// Add a product
exports.addProduct = asyncHandler(async (req, res) => {
    // here addproduct logic
    
    
});

// Update a product
exports.updateProduct = asyncHandler(async (req, res) => {
  res.status(500).json({ message: "Server error" });
});

// Delete a product
exports.deleteProduct = asyncHandler(async (req, res) => {
  res.status(500).json({ message: "Server error" });
});
