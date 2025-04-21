import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { subscriptions, payments } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";

export default async function SubscriptionsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // Get active subscription if exists
  const [activeSubscription] = await db
    .select()
    .from(subscriptions)
    .where(
      eq(subscriptions.userId, session.user.id)
    )
    .limit(1);

  // Get payment history
  const paymentHistory = await db
    .select()
    .from(payments)
    .where(eq(payments.userId, session.user.id))
    .orderBy(payments.createdAt);

  return (
    <div className="container mx-auto px-4 py-8">
      {activeSubscription ? (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Active Subscription</h2>
          <div className="bg-card p-6 rounded-lg shadow">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-semibold">{activeSubscription.status}</p>
              </div>
              <div>
                <p className="text-gray-600">Price</p>
                <p className="font-semibold">₹{activeSubscription.price}</p>
              </div>
              <div>
                <p className="text-gray-600">Start Date</p>
                <p className="font-semibold">
                  {new Date(activeSubscription.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">End Date</p>
                <p className="font-semibold">
                  {new Date(activeSubscription.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Choose a Plan</h2>
          <SubscriptionPlans />
        </div>
      )}

      {paymentHistory.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-card">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-4 py-2">
                      {new Date(payment.createdAt!).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">₹{payment.amount}</td>
                    <td className="px-4 py-2">{payment.status}</td>
                    <td className="px-4 py-2">{payment.razorpayPaymentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}