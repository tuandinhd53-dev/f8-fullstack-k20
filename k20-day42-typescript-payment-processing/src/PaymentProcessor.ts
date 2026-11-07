import type { PaymentResult, PaymentMethod, PaymentReceipt } from "./types";

export abstract class PaymentProcessor {
    // Biến static dùng chung cho tất cả các đối tượng
    private static nextReceiptId = 1;

    protected readonly orderId: number;
    protected amount: number;
    constructor(orderId: number, amount: number) {
        this.orderId = orderId;
        this.amount = amount;
    }

    // Hàm dùng chung để tạo hóa đơn thanh toán
    protected createReceipt(
        method: PaymentMethod,
        message: string,
    ): PaymentReceipt {
        return {
            id: PaymentProcessor.nextReceiptId++,
            orderId: this.orderId,
            amount: this.amount,
            method,
            message,
        };
    }

    abstract pay(): PaymentResult;
}

// /COD PAYMENT - THANH TOÁN KHI NHẬN HÀNG
export class CodPaymentProcessor extends PaymentProcessor {
    constructor(orderId: number, amount: number) {
        super(orderId, amount);
    }
    override pay(): PaymentResult {
        return {
            status: "success",
            data: this.createReceipt(
                "COD",
                `Thanh toán khi nhận hàng  cho đơn  #${this.orderId} thành công`,
            ),
        };
    }
}

// BANK TRANSFER - THANH TOÁN CHUYỂN KHOẢN

export class BankTransferProcessor extends PaymentProcessor {
    constructor(orderId: number, amount: number) {
        super(orderId, amount);
    }

    override pay(): PaymentResult {
        return {
            status: "success",
            data: this.createReceipt(
                "BANK_TRANSFER",
                `Chuyển khoản thành công cho đơn  #${this.orderId}`,
            ),
        };
    }
}

// /E-WALLET - THANH TOÁN VÍ ĐIỆN TỬ

export class EWalletPaymentProcessor extends PaymentProcessor {
    constructor(orderId: number, amount: number) {
        super(orderId, amount);
    }

    override pay(): PaymentResult {
        return {
            status: "success",
            data: this.createReceipt(
                "E_WALLET",
                `Thanh toán ví điện tử thành công cho đơn  #${this.orderId}`,
            ),
        };
    }
}
