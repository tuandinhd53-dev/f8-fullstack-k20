// Kiểu dữ liệu thanh toán

export type PaymentMethod = "COD" | "BANK_TRANSFER" | "E_WALLET";

export interface PaymentRequest {
    orderId: number;
    amount: number;
    method: PaymentMethod;
}

export interface PaymentReceipt extends PaymentRequest {
    id: number;
    message: string;
}

export type PaymentResult =
    | { status: "success"; data: PaymentReceipt }
    | { status: "error"; message: string };
