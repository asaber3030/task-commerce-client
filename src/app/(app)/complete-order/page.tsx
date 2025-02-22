import { redirect } from "next/navigation";

import { useTranslate } from "@/hooks/use-translate";
import { OrderProducts } from "@/components/pages/order-details/order-products";
import { OrderSummaryCard } from "@/components/pages/order-details/order-summary";
import { getUser } from "@/server/users";

const CompleteOrderPage = async () => {
  const user = await getUser();
  if (!user) return redirect("/login?callback=complete-order");

  return (
    <div className='py-8 max-w-screen-2xl mx-auto px-6 h-screen'>
      <header className='pb-2 border-b border-b-secondaryDark mb-4'>
        <h1 className='text-2xl font-bold'>Complete Order</h1>
      </header>

      <div className='grid grid-cols-8 gap-4'>
        <div className='xl:col-span-6 col-span-8 space-y-4'>
          <OrderProducts />
        </div>

        <div className='xl:col-span-2 col-span-8'>
          <OrderSummaryCard />
        </div>
      </div>
    </div>
  );
};

export default CompleteOrderPage;
