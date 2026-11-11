import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts, addProduct, updateProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ProductManagement() {
    const queryClient = useQueryClient();

    const initialFormState = {
        title: "",
        price: "",
        stock: "",
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [form, setForm] = useState(initialFormState);

    // Truy vấn Products
    const {
        data: products = [],
        isPending: isProductPending,
        isError: isProductError,
        error: productError,
        refetch: refetchProducts,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const addMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: (data) => {
            setIsDialogOpen(false);
            setForm(initialFormState);
            setSelectedProduct(null);

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            alert(`Đã thêm sản phẩm: ${data.title}`);
        },
        onError: (error) => {
            alert(`Thêm sản phẩm thất bại: ${error.message}`);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, product }) => updateProduct(id, product),
        onSuccess: (data) => {
            setIsDialogOpen(false);
            setForm(initialFormState);
            setSelectedProduct(null);

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            alert(`Đã sửa sản phẩm: ${data.title}`);
        },
        onError: (error) => {
            alert(`Sửa sản phẩm thất bại: ${error.message}`);
        },
    });

    const isSaving = addMutation.isPending || updateMutation.isPending;

    // Xử lý thêm sản phẩm mới
    function handleAdd() {
        setSelectedProduct(null);
        setForm(initialFormState);
        setIsDialogOpen(true);
    }

    // Xử lý sản phẩm cần chỉnh sửa
    function handleEdit(product) {
        setSelectedProduct(product);
        setForm({
            title: product.title,
            price: String(product.price),
            stock: String(product.stock),
        });
        setIsDialogOpen(true);
    }

    // Đóng Modal
    function handleClose() {
        setIsDialogOpen(false);
    }

    // Kiểm tra dữ liệu trước khi gửi lên API
    function validateForm() {
        //  Kiểm tra tên sản phẩm
        if (form.title.trim() === "") return false;

        //  Giá và số lượng không được để trống
        if (form.price.trim() === "") return false;
        if (form.stock.trim() === "") return false;

        // /Chuyển dữ liệu ở form từ string sang number
        const price = Number(form.price);
        const stock = Number(form.stock);

        // Giá: phải là số hữu hạn và lớn hơn 0
        if (!Number.isFinite(price) || price <= 0) return false;

        // Số lượng phải là số nguyên và >= 0
        if (!Number.isInteger(stock) || stock < 0) return false;

        return true;
    }

    // Xsử lý sự kiện khi nhấn nút Lưu
    function handleSubmit() {
        const isValid = validateForm();

        if (!isValid) {
            alert("Vui lòng kiểm tra lại thông tin sản phẩm.");
            return;
        }

        const productData = {
            title: form.title.trim(),
            price: Number(form.price),
            stock: Number(form.stock),
        };

        // Không có sản phẩm được chọn thì thực hiện POST
        if (!selectedProduct) {
            addMutation.mutate(productData);
        } else {
            // Có sản phẩm được chọn thì thực hiện PATCH
            updateMutation.mutate({
                id: selectedProduct.id,
                product: productData,
            });
        }
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Quản lý sản phẩm
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Quản lý danh sách sản phẩm của cửa hàng
                    </p>
                </div>

                <Button type="button" onClick={handleAdd}>
                    Thêm sản phẩm
                </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="space-y-4"
                    >
                        <DialogHeader>
                            <DialogTitle>
                                {selectedProduct
                                    ? "Sửa sản phẩm"
                                    : "Thêm sản phẩm"}
                            </DialogTitle>

                            <DialogDescription>
                                Nhập thông tin sản phẩm bên dưới.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2">
                            <Label htmlFor="title">Tên sản phẩm</Label>
                            <Input
                                id="title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="Nhập tên sản phẩm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Giá sản phẩm</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="any"
                                value={form.price}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                                placeholder="Nhập giá sản phẩm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stock">Số lượng sản phẩm</Label>
                            <Input
                                id="stock"
                                type="number"
                                min="0"
                                step="1"
                                value={form.stock}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        stock: e.target.value,
                                    }))
                                }
                                placeholder="Nhập số lượng sản phẩm"
                            />
                        </div>

                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Đang lưu..." : "Lưu"}
                        </Button>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                            >
                                Hủy
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Loading */}
            {isProductPending && (
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="h-12 animate-pulse rounded-lg bg-slate-100"
                        />
                    ))}
                </div>
            )}

            {/* Error */}
            {isProductError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        Không thể tải sản phẩm: {productError?.message}
                    </p>

                    <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        onClick={() => refetchProducts()}
                    >
                        Thử tải lại
                    </Button>
                </div>
            )}

            {/* Empty state */}
            {!isProductPending && !isProductError && products.length === 0 && (
                <div className="rounded-lg border border-dashed p-10 text-center">
                    <p className="text-slate-500">Chưa có sản phẩm nào</p>
                </div>
            )}

            {/* Product table */}
            {!isProductPending && !isProductError && products.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-3 font-semibold">
                                    Tên sản phẩm
                                </th>
                                <th className="px-4 py-3 font-semibold">Giá</th>
                                <th className="px-4 py-3 font-semibold">
                                    Tồn kho
                                </th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3 font-medium text-slate-900">
                                        {product.title}
                                    </td>

                                    <td className="px-4 py-3 text-slate-600">
                                        {product.price.toLocaleString("vi-VN")}{" "}
                                        $
                                    </td>

                                    <td className="px-4 py-3 text-slate-600">
                                        {product.stock}
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Sửa
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
export default ProductManagement;
