// Kiểu dữ liệu thanh toán

type PaymentMethod = "COD" | "BANK_TRANSFER" | "E_WALLET";

interface PaymentRequest {
    orderId: number;
    amount: number;
    method: PaymentMethod;
}

interface PaymentReceipt extends PaymentRequest {
    id: number;
    message: string;
}

type PaymentResult =
    | { status: "success"; data: PaymentReceipt }
    | { status: "error"; message: string };
