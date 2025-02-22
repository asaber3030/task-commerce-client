import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import { toast } from "react-toastify";

import moment from "moment";
import { APIResponse } from "@/types";
import { OrderStatus, Section, SectionTranslation, Settings } from "@prisma/client";
import { Eye, Check, Truck, PackageCheck, X, TriangleAlert } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateArray(length: number) {
  return Array.from({ length });
}

export function extractToken(headers: string) {
  return headers.split(" ")[1];
}

export function extractErrors(errors: ZodError) {
  return errors.flatten().fieldErrors;
}

export function randomHexColorCode() {
  let colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-gray",
    "bg-orange-500"
  ];
  return colors[Math.floor(Math.random() * 6)];
}

export function diffForHuman(date: Date) {
  return moment(date).fromNow();
}

export function formatDate(date: Date, format: string = "lll") {
  return moment(date).format(format);
}

export function showResponseMessage<T, P>(data?: APIResponse<T, P>, exectue?: Function) {
  if (data?.status && data?.status >= 200 && data?.status <= 299) {
    toast.success(data.message);
    if (exectue) exectue();
  } else {
    toast.error(data?.message);
  }
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num);
}

export function defaultHeaders(more: Record<string, string> = {}) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...more
  };
}

export function filterSettings(settings: Settings[], key: string, locale?: string) {
  if (locale) return settings.find((i) => i.locale === locale && i.key === key);

  return settings.find((i) => i.key === key);
}

export function filterSections(
  sections: (Section & { translations: SectionTranslation[] })[],
  key: string
) {
  return sections.find((i) => i.name === key);
}
export function orderStatusBadge(status: OrderStatus) {
  switch (status) {
    case OrderStatus.JustOrdered:
      return "outline";
    case OrderStatus.Reviewed:
      return "outline";
    case OrderStatus.Canceled:
      return "destructive";
    case OrderStatus.Refused:
      return "destructive";
    case OrderStatus.OutForDelivery:
      return "primary";
    case OrderStatus.Delivered:
      return "success";
  }
}

export function orderStatusLabel(status: OrderStatus) {
  switch (status) {
    case OrderStatus.JustOrdered:
      return "Just Ordered";
    case OrderStatus.Reviewed:
      return "Reviewed";
    case OrderStatus.OutForDelivery:
      return "Out For Delivery";
    case OrderStatus.Refused:
      return "Refused";
    case OrderStatus.Canceled:
      return "Canceled";
    case OrderStatus.Delivered:
      return "Delivered";
  }
}

export const OrderStatusArray = [
  OrderStatus.JustOrdered,
  OrderStatus.Reviewed,
  OrderStatus.OutForDelivery,
  OrderStatus.Refused,
  OrderStatus.Canceled,
  OrderStatus.Delivered
];

export const orderStatusIconObject = {
  [OrderStatus.JustOrdered]: Eye,
  [OrderStatus.Reviewed]: Check,
  [OrderStatus.OutForDelivery]: Truck,
  [OrderStatus.Delivered]: PackageCheck,
  [OrderStatus.Canceled]: X,
  [OrderStatus.Refused]: TriangleAlert
};
