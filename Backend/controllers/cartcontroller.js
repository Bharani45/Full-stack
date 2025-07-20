import usermodel from "../models/usermodel.js";

// Add to cart
const addcart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId; // ✅ From token

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "Missing itemId or size" });
    }

    const userData = await usermodel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartdata = userData.cartdata || {};

    if (!cartdata[itemId]) {
      cartdata[itemId] = {};
    }

    cartdata[itemId][size] = (cartdata[itemId][size] || 0) + 1;

    await usermodel.findByIdAndUpdate(userId, { cartdata });

    res.json({ success: true, message: "Cart updated", cartdata });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update quantity
const updatecart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    if (!itemId || !size || quantity == null) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const userData = await usermodel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartdata = userData.cartdata || {};

    if (!cartdata[itemId]) cartdata[itemId] = {};
    cartdata[itemId][size] = quantity;

    await usermodel.findByIdAndUpdate(userId, { cartdata });

    res.json({ success: true, message: "Cart updated", cartdata });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch cart
const usercart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await usermodel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartdata = userData.cartdata || {};
    res.json({ success: true, cartdata });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Remove item or size from cart
const removecart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "Missing itemId or size" });
    }

    const userData = await usermodel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartdata = userData.cartdata || {};

    if (cartdata[itemId] && cartdata[itemId][size] != null) {
      delete cartdata[itemId][size]; // Remove that size
      
      // If no sizes left for that item, remove the item entirely
      if (Object.keys(cartdata[itemId]).length === 0) {
        delete cartdata[itemId];
      }

      await usermodel.findByIdAndUpdate(userId, { cartdata });
      return res.json({ success: true, message: "Item removed from cart", cartdata });
    } else {
      return res.status(404).json({ success: false, message: "Item/Size not found in cart" });
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export { addcart, updatecart, usercart,removecart };
