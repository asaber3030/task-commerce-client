import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import React from "react"

type Props = {
  right: React.ReactNode
  left: React.ReactNode
  rightClass?: ClassValue
  leftClass?: ClassValue
}

export const OrderSummaryItem = ({ right, rightClass, left, leftClass }: Props) => {
  return (
    <li className="flex items-center justify-between">
      <span className={cn(leftClass)}>{left}</span>
      <span className={cn("font-bold", rightClass)}>{right}</span>
    </li>
  )
}
