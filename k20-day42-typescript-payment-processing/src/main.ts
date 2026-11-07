import "./style.css";

import type { PaymentReceipt } from "./types";
import { isPaymentRequest } from "./validators";
import { findById } from "./utils";

import {
    PaymentProcessor,
    CodPaymentProcessor,
    BankTransferProcessor,
    EWalletPaymentProcessor,
} from "./PaymentProcessor";

// 1. DOM ELEMENTS
const paymentForm = document.querySelector<HTMLFormElement>("#payment-form");
const orderIdInput = document.querySelector<HTMLInputElement>("#orderId");
const amountInput = document.querySelector<HTMLInputElement>("#amount");
const methodSelect = document.querySelector<HTMLSelectElement>("#method");
const paymentResult = document.querySelector<HTMLDivElement>("#payment-result");
const receiptList = document.querySelector<HTMLDivElement>("#receipt-list");

const searchForm = document.querySelector<HTMLFormElement>("#search-form");
const searchInput =
    document.querySelector<HTMLInputElement>("#search-receipt-id");
const searchResult = document.querySelector<HTMLDivElement>("#search-result");

const receiptCount =
    document.querySelector<HTMLParagraphElement>("#receipt-count");
const totalAmount =
    document.querySelector<HTMLParagraphElement>("#total-amount");

// 2. CHECK DOM
if (
    !paymentForm ||
    !orderIdInput ||
    !amountInput ||
    !methodSelect ||
    !paymentResult ||
    !receiptList ||
    !searchForm ||
    !searchInput ||
    !searchResult ||
    !receiptCount ||
    !totalAmount
) {
    throw new Error("Không tìm thấy các phần tử DOM cần thiết.");
}

// 3. STATE
const receipts: PaymentReceipt[] = [];

// 4. HELPER FUNCTIONS

function formatCurrency(amount: number): string {
    return amount.toLocaleString("vi-VN") + " ₫";
}

function showFeedback(
    element: HTMLDivElement,
    type: "success" | "error",
    message: string,
): void {
    element.classList.remove("hidden");

    element.className =
        type === "success"
            ? "mt-5 rounded-xl border border-green-800 bg-green-950 p-4 text-sm text-green-400"
            : "mt-5 rounded-xl border border-red-800 bg-red-950 p-4 text-sm text-red-400";

    element.textContent = message;
}

function updateStatistics(): void {
    receiptCount!.textContent = String(receipts.length);

    const total = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);

    totalAmount!.textContent = formatCurrency(total);
}

function renderReceipts(): void {
    if (receipts.length === 0) {
        receiptList!.innerHTML = `
            <p class="rounded-xl border border-dashed border-gray-700 px-4 py-8 text-center text-sm text-gray-500">
                Chưa có giao dịch nào.
            </p>
        `;
        return;
    }

    receiptList!.innerHTML = receipts
        .map(
            (receipt) => `
                <article class="rounded-xl border border-gray-800 bg-[#0B0F14] p-4">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="font-semibold">
                            Hóa đơn #${receipt.id}
                        </span>
                        <span class="rounded-full border border-green-800 bg-green-950 px-3 py-1 text-xs text-green-400">
                            Thành công
                        </span>
                    </div>

                    <div class="mt-3 space-y-2 text-sm text-gray-400">
                        <p>Đơn hàng: #${receipt.orderId}</p>
                        <p>Phương thức: ${receipt.method}</p>
                    </div>

                    <div class="mt-3 border-t border-gray-800 pt-3">
                        <p class="text-xs text-gray-500">Số tiền</p>
                        <p class="mt-1 font-semibold text-white">
                            ${formatCurrency(receipt.amount)}
                        </p>
                    </div>
                </article>
            `,
        )
        .join("");
}

// 5. PAYMENT FORM
paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const paymentRequest = {
        orderId: Number(orderIdInput.value),
        amount: Number(amountInput.value),
        method: methodSelect.value,
    };

    // Validate dữ liệu
    if (!isPaymentRequest(paymentRequest)) {
        showFeedback(
            paymentResult,
            "error",
            "Dữ liệu thanh toán không hợp lệ. Vui lòng kiểm tra lại thông tin.",
        );
        return;
    }

    // Khởi tạo processor theo phương thức thanh toán
    let processor: PaymentProcessor;

    switch (paymentRequest.method) {
        case "COD":
            processor = new CodPaymentProcessor(
                paymentRequest.orderId,
                paymentRequest.amount,
            );
            break;

        case "BANK_TRANSFER":
            processor = new BankTransferProcessor(
                paymentRequest.orderId,
                paymentRequest.amount,
            );
            break;

        case "E_WALLET":
            processor = new EWalletPaymentProcessor(
                paymentRequest.orderId,
                paymentRequest.amount,
            );
            break;
    }

    // Thực hiện thanh toán
    const result = processor.pay();

    if (result.status === "success") {
        // Lưu hóa đơn
        receipts.unshift(result.data);

        // Cập nhật giao diện
        showFeedback(paymentResult, "success", result.data.message);

        renderReceipts();
        updateStatistics();

        // Reset form
        paymentForm.reset();
    } else {
        showFeedback(paymentResult, "error", result.message);
    }
});

// 6. SEARCH RECEIPT
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const receiptId = Number(searchInput.value);

    if (!Number.isInteger(receiptId) || receiptId <= 0) {
        showFeedback(
            searchResult,
            "error",
            "Vui lòng nhập mã hóa đơn là số nguyên dương.",
        );
        return;
    }

    const receipt = findById(receipts, receiptId);

    if (!receipt) {
        showFeedback(
            searchResult,
            "error",
            `Không tìm thấy hóa đơn #${receiptId}.`,
        );
        return;
    }

    showFeedback(
        searchResult,
        "success",
        `Tìm thấy hóa đơn #${receipt.id} | Đơn hàng #${receipt.orderId} | ${formatCurrency(receipt.amount)} | ${receipt.method}`,
    );
});
