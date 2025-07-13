import ordermodel from "../models/ordermodel.js";
import productmodel from "../models/productmodel.js";

const vendororders = async (req, res) => {
  console.log("✅ vendororders endpoint hit");

  try {
    const vendorEmail = req.user.email;

    // Step 1: Get all products by vendor
    const vendorProducts = await productmodel.find({ vendorEmail }, '_id');
    const productIds = vendorProducts.map(p => p._id.toString());
    console.log("🧩 Vendor product IDs:", productIds);

    // Step 2: Get all orders
    const orders = await ordermodel.find();

    // Step 3: Filter orders that contain vendor's products
    const vendorOrders = orders
      .map(order => {
        const vendorItems = {};

        // Convert Mongoose Map to regular object
        const orderItems = order.items instanceof Map
          ? Object.fromEntries(order.items)
          : order.items;

        for (const key in orderItems) {
          const productId = key.split("_")[0];
          if (productIds.includes(productId)) {
            vendorItems[key] = orderItems[key];
          }
        }

        if (Object.keys(vendorItems).length === 0) return null;

        return {
          ...order._doc,
          items: vendorItems
        };
      })
      .filter(Boolean);

    res.json({ success: true, orders: vendorOrders });
  } catch (error) {
  console.error("❌ Vendor orders error:", error);  // update below
  res.status(500).json({ success: false, message: "Internal server error", error: error.message });
}

};

const vendorupdatestatus = async (req, res) => {
  try {
    const { orderId, productKey, status } = req.body;
    console.log("🔧 Incoming update request:", req.body);

    if (!orderId || !productKey || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const productId = productKey.split("_")[0];

    const product = await productmodel.findById(productId);
    if (!product || product.vendorEmail !== req.user.email) {
      return res.status(403).json({ success: false, message: "Unauthorized product access" });
    }

    const order = await ordermodel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const items = order.items instanceof Map ? Object.fromEntries(order.items) : order.items;

    if (!items[productKey]) {
      return res.status(404).json({ success: false, message: "Product not found in order" });
    }

    // Update status
    items[productKey].status = status;
    order.items = items;
    await order.save();

    res.json({ success: true, message: "Product status updated in order" });
  } catch (error) {
    console.error("Vendor update status error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export { vendororders, vendorupdatestatus};
