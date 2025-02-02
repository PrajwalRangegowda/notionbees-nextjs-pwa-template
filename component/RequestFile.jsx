"use client";
import { useState } from "react";

const Payment = () => {
  const [status, setStatus] = useState(null);

  // Function to initiate the payment request
  const initiatePayment = async () => {
    if (!window.PaymentRequest) {
      setStatus("Payment Request API is not supported in your browser.");
      return;
    }

    try {
      const paymentRequest = new PaymentRequest(
        [
          {
            supportedMethods: ["basic-card"], // Payment method
            data: {
              supportedNetworks: ["visa", "mastercard", "amex"], // Card networks supported
            },
          },
        ],
        {
          total: {
            label: "Total",
            amount: { currency: "USD", value: "20.00" }, // The amount to be paid
          },
        }
      );

      // Show payment UI
      const paymentResponse = await paymentRequest.show();

      // Simulate sending payment info to the backend for processing
      await fakeBackendPaymentProcessing(paymentResponse);

      // Complete the payment request
      paymentResponse.complete("success");

      setStatus("Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      setStatus("Payment failed. Please try again.");
    }
  };

  // Fake backend payment processing
  const fakeBackendPaymentProcessing = async (paymentResponse) => {
    // Simulating backend communication
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-semibold">Web Payment Example</h2>
      <button
        onClick={initiatePayment}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Pay $20
      </button>

      {status && <p className="mt-4 text-gray-600">{status}</p>}
    </div>
  );
};

export default Payment;
