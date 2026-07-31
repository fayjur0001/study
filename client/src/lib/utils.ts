import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number, currency: "USD" | "BDT" = "USD") {
  if (currency === "BDT") {
    const bdtAmount = Math.round(amount * 110)
    const str = bdtAmount.toString()
    const lastThree = str.slice(-3)
    const otherDigits = str.slice(0, -3)
    const formattedOther = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
    const grouped = otherDigits
      ? `${formattedOther},${lastThree}`
      : lastThree
    return `৳${grouped}`
  }
  return `$${amount.toLocaleString("en-US")}`
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}