import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// FIX: Define the URL here instead of importing from vendor
const bakendurl = import.meta.env.VITE_BACKEND_URL; 

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const success = params.get("success");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyStripePayment = async () => {
      try {
        const amount = localStorage.getItem("stripe_amount");
        const address = JSON.parse(localStorage.getItem("stripe_address"));

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

          localStorage.removeItem("stripe_amount");
          localStorage.removeItem("stripe_address");

          // ✅ Redirect to orders page after short delay
          setTimeout(() => {
            navigate("/orders");
          }, 2000); 
        } else {
          toast.error("Payment failed or cancelled.");
        }
      } catch (error) {
        toast.error("Payment verification error.");
        console.error(error);
      }
    };

    if (userId && success !== null) verifyStripePayment();
  }, [userId, success, navigate]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Processing your order...</h1>
    </div>
  );
};

export default OrderSuccess;