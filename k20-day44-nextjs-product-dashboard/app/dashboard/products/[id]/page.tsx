import { Suspense } from "react";
import { getProductById } from "@/app/lib/products";
import Link from "next/link";

//  Kiểu dữ liệu params được Next.js truyền vào
type ProductDetailProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function ProductDetail(props: ProductDetailProps) {
    return (
        <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
            <ProductDetailContent params={props.params} />
        </Suspense>
    );
}

// Component xử lý dữ liệu và hiển thị chi tiết sản phẩm
async function ProductDetailContent({ params }: ProductDetailProps) {
    // /Nhận ID từ URL
    const { id } = await params;

    const numberId = Number(id);

    const isValidNumberId = Number.isInteger(numberId) && numberId > 0;

    let product = null;

    if (isValidNumberId) {
        try {
            product = await getProductById(numberId);
        } catch {
            // API lỗi hoặc không tìm thấy sản phẩm
            product = null;
        }
    }

    if (!product) {
        return (
            <main className="mx-auto mt-12 max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h2 className="mb-2 text-xl font-bold text-red-600">
                    Không tìm thấy sản phẩm
                </h2>

                <p className="mb-6 text-gray-600">
                    Sản phẩm với mã định danh{" "}
                    <span className="font-semibold">{id}</span> không tồn tại
                    hoặc đường dẫn không hợp lệ.
                </p>

                <Link
                    href="/dashboard/products"
                    className="inline-block rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                    Quay về danh sách sản phẩm
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">
                Chi tiết sản phẩm
            </h1>

            <div className="mb-8 space-y-4">
                <div>
                    <span className="block text-sm font-medium text-gray-500">
                        Mã sản phẩm (ID)
                    </span>

                    <span className="text-lg font-semibold text-gray-900">
                        {product.id}
                    </span>
                </div>

                <div>
                    <span className="block text-sm font-medium text-gray-500">
                        Tên sản phẩm
                    </span>

                    <span className="text-lg font-semibold text-gray-900">
                        {product.name}
                    </span>
                </div>

                <div>
                    <span className="block text-sm font-medium text-gray-500">
                        Giá tiền
                    </span>

                    <span className="text-xl font-bold text-blue-600">
                        {product.price.toLocaleString("vi-VN")} đ
                    </span>
                </div>
            </div>

            <Link
                href="/dashboard/products"
                className="inline-block rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-200"
            >
                Quay lại danh sách
            </Link>
        </main>
    );
}
