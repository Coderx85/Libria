'use client';

import { SUBSCRIPTION_PLANS } from '@/lib/razorpay';
import { useSession } from 'next-auth/react';
import Razorpay from 'razorpay';
import { useCallback, useEffect } from 'react';

export default function SubscriptionPlans() {
  const { data: session } = useSession();

  const handlePayment = useCallback(async (planId: string) => {
    try {
      // Create order
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create order');
      }

      const { orderId } = await response.json();
      console.log('Order ID:', orderId);

      // Initialize Razorpay
      const options = {
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        // order_id: orderId,
        // name: 'Libria',
        // description: 'Book Subscription',
        // // handler: function (response: any) {
        // //   console.log('Payment successful:', response);
        // //   // You can redirect to a success page or update UI here
        // // },
        // prefill: {
        //   email: session?.user?.email,
        // },
      };

      const razorpayInstance = new Razorpay(options);
      console.log('Razorpay instance:', razorpayInstance);
    }
    catch (error) {
    console.error('Payment initiation error:', error);
    alert('Failed to initiate payment. Please try again.');
    }
  }, []);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
        <div
          key={plan.id}
          className="flex flex-col rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="mt-2 text-gray-600">{plan.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">₹{plan.price}</span>
            <span className="text-gray-600">/{plan.duration} days</span>
          </div>
          <button
            onClick={() => handlePayment(plan.id)}
            className="mt-6 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors"
            disabled={!session}
          >
            {session ? 'Subscribe Now' : 'Sign in to Subscribe'}
          </button>
        </div>
      ))}
    </div>
  );
}