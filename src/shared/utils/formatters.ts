/**
 * Narxni formatlash (so'm)
 */
export function formatPrice(price: number, locale = "uz-UZ"): string {
  return price.toLocaleString(locale);
}

/**
 * Narxni to'liq formatlash (valyuta bilan)
 */
export function formatPriceWithCurrency(
  price: number,
  currency = "сум",
  locale = "uz-UZ"
): string {
  return `${formatPrice(price, locale)} ${currency}`;
}

/**
 * Chegirma foizini hisoblash
 */
export function calculateDiscountPercent(
  originalPrice: number,
  discountPrice?: number
): number {
  if (!discountPrice || discountPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
}

/**
 * Telefon raqamini formatlash
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("998")) {
    return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  }
  return phone;
}

/**
 * Sanani formatlash
 */
export function formatDate(
  date: Date | string,
  locale = "ru-RU"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Vaqtni formatlash
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
