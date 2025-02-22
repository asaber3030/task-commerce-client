import Link from "next/link";

import { countOrders, getCurrentOrder, getOrders } from "@/server/users";
import { orderStatusLabel } from "@/lib/utils";
import { routes } from "@/lib/routes";

import { ProfileTitle } from "@/components/pages/user/profile-title";
import { CurrentOrderBlock } from "@/components/pages/user/current-order-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { LinkBtn } from "@/components/common/link-button";

async function OrdersPage() {
  const numOfOrders = await countOrders();
  const orders = await getOrders();
  const currentOrder = await getCurrentOrder();

  return (
    <div>
      {currentOrder && (
        <div>
          <CurrentOrderBlock order={currentOrder} />
          <Separator className='my-4' />
        </div>
      )}

      <ProfileTitle title='Orders'>
        <p className='text-gray-500 flex gap-2'>
          Ordered items
          <span className='text-secondaryMain font-bold'>{numOfOrders} orders</span>
        </p>
      </ProfileTitle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>No. Of items</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Delivery Taxes</TableHead>
            <TableHead>Sub Total</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={11}>
                <EmptyState title='No orders' />
              </TableCell>
            </TableRow>
          )}
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className='font-medium'>{order.id}</TableCell>
              <TableCell>
                <Badge variant={"outline"}>{orderStatusLabel(order.status)}</Badge>
              </TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>{order.discountValue}</TableCell>
              <TableCell>{order.deliveryValue}</TableCell>
              <TableCell className='font-medium text-green-500'>{order.subTotal} EGP</TableCell>
              <TableCell className='font-medium text-green-500'>{order.total} EGP</TableCell>
              <TableCell>
                <LinkBtn href={routes.viewOrder(order.id)}>View Order</LinkBtn>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersPage;
