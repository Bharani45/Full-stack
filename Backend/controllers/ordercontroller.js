import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🟢 COD Order
const placeordercod = async (req, res) => {
  try {
    const userId = req.userId;
    const { address, amount } = req.body;

    const user = await usermodel.findById(userId);
    if (!user || !user.cartdata || Object.keys(user.cartdata).length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const newOrder = new ordermodel({
      userId,
      items: user.cartdata,
      address,
      amount,
      paymentmethod: "COD",
      payment: false,
      status: "Placed",
    });

    await newOrder.save();
    await usermodel.findByIdAndUpdate(userId, { cartdata: {} });

    res.json({ success: true, message: "Order placed successfully (COD)", orderId: newOrder._id });
  } catch (error) {
    console.error("COD order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const placeorderstripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { address, amount } = req.body;

    const user = await usermodel.findById(userId);
    if (!user || !user.cartdata || Object.keys(user.cartdata).length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: { name: 'Your Order' },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/order-success?userId=${userId}&success=true&amount=${amount}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    return res.json({ success: true, session_url: stripeSession.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// 🟢 Razorpay Order
const placeorderrazrop = async (req, res) => {
  try {
    const userId = req.userId;
    const { address, totalAmount, razorpayPaymentId } = req.body;

    if (!razorpayPaymentId) {
      return res.status(400).json({ success: false, message: "Razorpay payment ID required" });
    }

    const user = await usermodel.findById(userId);
    if (!user || !user.cartdata || Object.keys(user.cartdata).length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const newOrder = new ordermodel({
      userId,
      items: user.cartdata,
      address,
      amount: totalAmount,
      paymentmethod: "Razorpay",
      payment: true,
      status: "Placed",
    });

    await newOrder.save();
    await usermodel.findByIdAndUpdate(userId, { cartdata: {} });

    res.json({ success: true, message: "Razorpay order placed", orderId: newOrder._id });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 🟢 Admin: All Orders
const allorder = async (req, res) => {
  try {
    const orders = await ordermodel.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 🟢 User: My Orders
const userorders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await ordermodel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 🟢 Admin: Update Status
const updatestatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Missing orderId or status" });
    }

    await ordermodel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifystripe = async (req, res) => {
  const { userId, success, address, amount } = req.body;

  try {
    if (success === "true" || success === true) {
      const user = await usermodel.findById(userId);
      if (!user || !user.cartdata || Object.keys(user.cartdata).length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }

      const newOrder = new ordermodel({
        userId,
        items: user.cartdata,
        address,
        amount,
        paymentmethod: "Stripe",
        payment: true,
        status: "Placed",
      });

      await newOrder.save();
      await usermodel.findByIdAndUpdate(userId, { cartdata: {} });

      return res.json({ success: true, orderId: newOrder._id });
    } else {
      return res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("verifystripe error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export {
  placeordercod,
  placeorderstripe,
  placeorderrazrop,
  allorder,
  userorders,
  updatestatus,
  verifystripe
};
