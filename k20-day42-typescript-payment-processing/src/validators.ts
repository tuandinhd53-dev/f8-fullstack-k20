import type { PaymentRequest, PaymentMethod } from "./types";

const PAYMENT_METHODS: PaymentMethod[] = ["COD", "BANK_TRANSFER", "E_WALLET"];

export function isPaymentRequest(value: unknown): value is PaymentRequest {
    if (typeof value !== "object" || value === null) return false;

    const data = value as Record<string, unknown>;

    const { orderId, amount, method } = data;

    // Kiểm tra oderId là số nguyên dương

    const isValidOrderId =
        typeof orderId === "number" && Number.isInteger(orderId) && orderId > 0;

    // amount là số hữu hạn và lớn hơn 0.

    const isValidAmount =
        typeof amount === "number" && Number.isFinite(amount) && amount > 0;

    // method  là 1 trong 3 giá trị hợp lệ của PaymentMethod

    const isValidMethod =
        typeof method === "string" &&
        PAYMENT_METHODS.includes(method as PaymentMethod);

    return isValidOrderId && isValidAmount && isValidMethod;
}
