"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { StripeProvider } from "@/app/providers";
import { CreditCardIcon } from "@heroicons/react/24/outline";

interface PaymentFormProps {
  amount: number;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
  serviceName: string;
}

function PaymentFormContent({ amount, onSuccess, onError, serviceName }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/success` },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        if (onError) onError(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        if (onSuccess) onSuccess(paymentIntent.id);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      if (onError) onError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{serviceName}</h3>
          <span className="text-lg font-semibold">£{(amount / 100).toFixed(2)}</span>
        </div>
        
        <PaymentElement />
        
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{errorMessage}</div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center justify-center disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            <CreditCardIcon className="h-5 w-5 mr-2" />
            Pay £{(amount / 100).toFixed(2)}
          </span>
        )}
      </button>
    </form>
  );
}

export default function StripePaymentForm(props: PaymentFormProps) {
  return (
    <StripeProvider>
      <PaymentFormContent {...props} />
    </StripeProvider>
  );
}