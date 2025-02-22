import { SingleOrder } from "@/components/pages/user/single-order";
import { getOrder } from "@/server/users";
import { getUser } from "@/server/users";
import { notFound } from "next/navigation";

const OrderIdPage = async ({ params }: { params: { id: string } }) => {
  const orderId = params.id ? +params.id : 0;
  const order = await getOrder(orderId);
  const user = await getUser();

  if (!order || user?.id != order.userId) return notFound();

  return <SingleOrder order={order} />;
};

export default OrderIdPage;
