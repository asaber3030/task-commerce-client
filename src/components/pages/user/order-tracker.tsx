import { OrderStatusArray } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { ShoppingCart, ClipboardCheck, Truck, XCircle, Package } from "lucide-react";

export function OrderTracker({
  currentStatus = OrderStatus.JustOrdered
}: {
  currentStatus: OrderStatus;
}) {
  const getStatusIndex = (status: OrderStatus) => OrderStatusArray.indexOf(status);
  const currentIndex = getStatusIndex(currentStatus);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.JustOrdered:
        return <ShoppingCart className='w-6 h-6' />;
      case OrderStatus.Reviewed:
        return <ClipboardCheck className='w-6 h-6' />;
      case OrderStatus.OutForDelivery:
        return <Truck className='w-6 h-6' />;
      case OrderStatus.Refused:
      case OrderStatus.Canceled:
        return <XCircle className='w-6 h-6' />;
      case OrderStatus.Delivered:
        return <Package className='w-6 h-6' />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <ol className='flex items-center w-full'>
        {OrderStatusArray.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isRefusedOrCanceled =
            status === OrderStatus.Refused || status === OrderStatus.Canceled;

          return (
            <li
              key={status}
              className={`flex items-center ${
                index !== OrderStatusArray.length - 1 ? "w-full" : ""
              }`}
            >
              <div className='flex flex-col items-center'>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted || isCurrent
                      ? isRefusedOrCanceled
                        ? "bg-red-200 text-red-600"
                        : "bg-primary text-primary-foreground"
                      : "bg-white text-gray-600"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {getStatusIcon(status)}
                </div>
                <span
                  className={`mt-2 text-xs ${isCurrent ? "font-medium" : "font-normal"} ${
                    isRefusedOrCanceled ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {status}
                </span>
              </div>
              {index !== OrderStatusArray.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentIndex
                      ? isRefusedOrCanceled
                        ? "bg-red-300"
                        : "bg-primary"
                      : "bg-secondaryMain"
                  }`}
                ></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
