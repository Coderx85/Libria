import Razorpay from 'razorpay';

// Initialize Razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    id: "monthly",
    name: "Monthly Plan",
    description: "Monthly subscription for borrowing books",
    price: 299, // in rupees
    duration: 30, // in days
  },
  QUARTERLY: {
    id: "quarterly", 
    name: "Quarterly Plan",
    description: "Quarterly subscription for borrowing books",
    price: 799,
    duration: 90,
  },
  YEARLY: {
    id: "yearly",
    name: "Yearly Plan",
    description: "Yearly subscription for borrowing books",
    price: 2999,
    duration: 365,
  },
} as const;