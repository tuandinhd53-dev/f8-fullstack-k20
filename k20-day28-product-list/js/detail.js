// Dom
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");
const productDetail = document.querySelector("#product-detail");

//  Lấy ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);

const url = `https://dummyjson.com/products/${id}`;

async function getProduct() {
    if (!id) {
        loading.classList.add("hidden");
        errorMessage.classList.remove("hidden");

        errorMessage.textContent = "Không tìm thấy sản phẩm...";
        return;
    }

    // Loading khi tải trang
    loading.classList.remove("hidden");

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();
        console.log(data);

        // Render
        renderProducts(data);

        // Lấy DOM sau khi render
        const productImages = document.querySelector("#product-images");
        const productImage = document.querySelector("#product-image");

        // CLick đổi ảnh
        productImages.addEventListener("click", (e) => {
            if (e.target.tagName !== "IMG") {
                return;
            }

            productImage.src = e.target.src;

            // Lặp và thêm xóa highlight

            const images = productImages.querySelectorAll("img");
            images.forEach((image) => {
                image.classList.remove(
                    "border-[#E94F7D]",
                    "ring-2",
                    "ring-[#E94F7D]",
                );
            });
            e.target.classList.add(
                "border-[#E94F7D]",
                "ring-2",
                "ring-[#E94F7D]",
            );
        });

        // Thành công ẩn Loading

        loading.classList.add("hidden");
    } catch (error) {
        console.log("Lỗi:", error);

        // Lỗi ẩn loading hiện Lỗi
        loading.classList.add("hidden");
        errorMessage.classList.remove("hidden");

        // Không thấy ID Product
        errorMessage.textContent = "Không tìm thấy ID sản phẩm...";
    }
}
getProduct();

function renderProducts(product) {
    productDetail.innerHTML = `<!-- Product Detail -->
<section
    id="product-detail"
    aria-label="Chi tiết sản phẩm"
    class="mx-auto mt-6 max-w-5xl sm:mt-8"
>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">

        <!-- Product Images -->
<div class="self-start">

    <!-- Main Image -->
    <div
        class="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-[#F3C4D2] bg-[#FFF5F8]"
    >
        <img
            id="product-image"
            src="${product.images[0]}"
            alt="${product.title}"
            class="h-full w-full object-contain p-4"
        />
    </div>


    <!-- Thumbnail Images -->
    <div
        id="product-images"
        class="mt-3 grid grid-cols-4 gap-2"
    >
        <!-- JS render thumbnails -->
        ${product.images
            .map(
                (image) => `
   <img
                src="${image}"
                alt="${product.title}"
                class="h-16 w-16 cursor-pointer rounded-lg border border-[#E8CBD3] bg-[#FFF5F8] object-contain p-1 transition hover:border-[#E94F7D] hover:opacity-80"
            >
`,
            )
            .join("")}
    </div>

</div>


        <!-- Product Information -->
        <div class="flex flex-col">

            <!-- Category -->
            <span
                id="product-category"
                class="capitalize w-fit rounded-md bg-[#FFE8EF] px-2.5 py-1 text-xs font-semibold text-[#E94F7D]"
            >
            ${product.category}
            </span>


            <!-- Title -->
            <h1
                id="product-title"
                class="mt-3 text-xl font-bold leading-tight text-[#4D3D3D] sm:text-2xl"
            >
                ${product.title}
            </h1>


            <!-- Description -->
            <p
                id="product-description"
                class="mt-3 text-sm leading-6 text-[#6B6060]"
            >
                ${product.description}
            </p>


            <!-- Rating -->
            <div
                class="mt-4 flex items-center gap-2 border-b border-[#F0DDE2] pb-4"
            >
                <span
                    class="text-[#FFB000]"
                    aria-hidden="true"
                >
                    ${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}
                </span>

                <span
                    id="product-rating"
                    class="text-sm font-semibold text-[#333333]"
                >
                    ${product.rating}
                </span>

                <span class="text-sm text-[#999999]">
                    đánh giá
                </span>
            </div>


            <!-- Price -->
            <div
                class="flex flex-wrap items-center gap-3 border-b border-[#F0DDE2] py-4"
            >
                <span
                    id="product-price"
                    class="text-2xl font-bold text-[#E94F7D]"
                >
                    ${(
                        product.price *
                        (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                </span>

                <span
                    id="product-original-price"
                    class="text-sm text-[#999999] line-through"
                >
                    ${product.price}
                </span>

                <span
                    id="product-discount"
                    class="rounded-md bg-[#FFE8EF] px-2 py-1 text-xs font-semibold text-[#E94F7D]"
                >
                    -${Math.round(product.discountPercentage)}%
                </span>
            </div>


            <!-- Stock -->
            <div
                class="flex items-center gap-2 py-4 text-sm font-medium text-[#0F9F6E]"
            >
                <span
                    class="h-2 w-2 rounded-full bg-[#0F9F6E]"
                    aria-hidden="true"
                ></span>

                <span id="product-stock">
                    Còn ${product.stock} sản phẩm
                </span>
            </div>


            <!-- Specifications -->
            <div
                class="border-b border-[#F0DDE2] pb-4"
            >
                <h2
                    class="text-sm font-bold text-[#4D3D3D]"
                >
                    Thông số sản phẩm
                </h2>

                <div
                    class="mt-3 grid grid-cols-2 gap-x-6 gap-y-3"
                >
                    <!-- SKU -->
                    <div>
                        <p class="text-xs text-[#999999]">
                            SKU
                        </p>

                        <p
                            id="product-sku"
                            class="mt-1 text-sm font-medium text-[#333333]"
                        >
                            ${product.sku}
                        </p>
                    </div>


                    <!-- Weight -->
                    <div>
                        <p class="text-xs text-[#999999]">
                            Khối lượng
                        </p>

                        <p
                            id="product-weight"
                            class="mt-1 text-sm font-medium text-[#333333]"
                        >
                            ${product.weight}g
                        </p>
                    </div>


                    <!-- Dimensions -->
                    <div>
                        <p class="text-xs text-[#999999]">
                            Kích thước
                        </p>

                        <p
                            id="product-dimensions"
                            class="mt-1 text-sm font-medium text-[#333333]"
                        >
                            ${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm
                        </p>
                    </div>

                    <!-- Tags -->
                    <div>
                        <p class="text-xs text-[#999999]">
                            Nhãn
                        </p>

                        <p
                            id="product-Tags"
                            class="mt-1 text-sm font-medium text-[#333333]"
                        >
                            ${
                                product.tags.length
                                    ? product.tags
                                          .map(
                                              (tags) =>
                                                  `<span class="rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-600">${tags}</span>`,
                                          )
                                          .join(" ")
                                    : "-"
                            }
                        </p>
                    </div>

                </div>
            </div>


            
                

            </div>

        </div>
    </div>
</section>

<!-- User Reviews -->
<section
    id="product-reviews"
    aria-label="Đánh giá sản phẩm"
    class="mx-auto mt-8 max-w-5xl border-t border-[#F0DDE2] pt-8"
>
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-xl font-bold text-[#4D3D3D]">
                Đánh giá người dùng
            </h2>
            <p class="mt-1 text-sm text-[#999999]">
                Khách hàng đã nói gì về sản phẩm này?
            </p>
        </div>
        
    </div>
    <!-- Reviews List -->
    <div class="mt-6 space-y-4">
        ${
            product.reviews?.length
                ? product.reviews
                      .map(
                          (review) => `
        <article
            class="rounded-xl border border-[#F0DDE2] bg-white p-4 transition hover:border-[#E8CBD3] hover:shadow-sm"
        >
            <!-- User -->
            <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <!-- Avatar -->
                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFE8EF] text-sm font-bold text-[#E94F7D]"
                    >
                        ${review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-[#4D3D3D]">
                            ${review.reviewerName}
                        </p>
                        <p class="text-xs text-[#999999]">
                            ${new Date(review.date).toLocaleDateString("vi-VN")}
                        </p>
                    </div>
                </div>
                <!-- Rating -->
                <div
                    class="flex shrink-0 items-center gap-1 text-sm text-[#FFB000]"
                    aria-label="${review.rating} trên 5 sao"
                >
                    <span aria-hidden="true">
                        ${"★".repeat(review.rating)} ${"☆".repeat(
                            5 - review.rating,
                        )}
                    </span>
                    <span class="ml-1 font-semibold text-[#4D3D3D]">
                        ${review.rating}
                    </span>
                </div>
            </div>
            <!-- Comment -->
            <p class="mt-3 text-sm leading-6 text-[#6B6060]">
                ${review.comment}
            </p>
        </article>
        `,
                      )
                      .join("")
                : `
        <div
            class="rounded-xl border border-[#F0DDE2] bg-[#FFF5F8] p-6 text-center"
        >
            <p class="text-sm text-[#999999]">Chưa có đánh giá nào.</p>
        </div>
        `
        }
    </div>
</section>

`;
}
