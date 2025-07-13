import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { bakendurl } from "../../../vendor/src/App";
import React from "react";

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const success = params.get("success");

  useEffect(() => {
    const verifyStripePayment = async () => {
      try {
        const amount = localStorage.getItem("stripe_amount");
        const address = JSON.parse(localStorage.getItem("stripe_address"));

        // ⛔ Check if any is missing
        if (!amount || !address) {
          toast.error("Missing payment data.");
          return;
        }

        const res = await axios.post(
          `${bakendurl}/api/order/verifystripe`,
          { userId, success, address, amount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        if (res.data.success) {
          toast.success("Payment verified and order placed!");

          // Clear cart-related temp storage
          localStorage.removeItem("stripe_amount");
          localStorage.removeItem("stripe_address");
        } else {
          toast.error("Payment failed or cancelled.");
        }
      } catch (error) {
        toast.error("Payment verification error.");
        console.error(error);
      }
    };

    if (userId && success !== null) verifyStripePayment();
  }, [userId, success]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Processing your order...</h1>
    </div>
  );
};

export default OrderSuccess;
