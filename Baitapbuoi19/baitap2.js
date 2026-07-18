const customers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
    { id: 5, name: "Charlie Green", email: "charlie@example.com" },
];

const products = [
    { id: 101, name: "Laptop", price: 1200 },
    { id: 102, name: "Phone", price: 800 },
    { id: 103, name: "Tablet", price: 500 },
    { id: 104, name: "Smartwatch", price: 300 },
    { id: 105, name: "Headphones", price: 150 },
];

const orders = [
    {
        id: 1001,
        customerId: 1,
        items: [
            { productId: 101, quantity: 2 },
            { productId: 102, quantity: 1 },
        ],
    },
    {
        id: 1002,
        customerId: 2,
        items: [
            { productId: 102, quantity: 1 },
            { productId: 103, quantity: 3 },
        ],
    },
    {
        id: 1003,
        customerId: 3,
        items: [
            { productId: 104, quantity: 5 },
            { productId: 105, quantity: 2 },
        ],
    },
    {
        id: 1004,
        customerId: 4,
        items: [
            { productId: 101, quantity: 1 },
            { productId: 103, quantity: 2 },
        ],
    },
    {
        id: 1005,
        customerId: 5,
        items: [{ productId: 105, quantity: 10 }],
    },
    {
        id: 1006,
        customerId: 1,
        items: [
            { productId: 101, quantity: 1 },
            { productId: 105, quantity: 3 },
        ],
    },
    {
        id: 1007,
        customerId: 2,
        items: [
            { productId: 104, quantity: 2 },
            { productId: 103, quantity: 1 },
        ],
    },
    {
        id: 1008,
        customerId: 3,
        items: [{ productId: 102, quantity: 2 }],
    },
    {
        id: 1009,
        customerId: 4,
        items: [
            { productId: 101, quantity: 1 },
            { productId: 102, quantity: 1 },
        ],
    },
    {
        id: 1010,
        customerId: 5,
        items: [
            { productId: 103, quantity: 4 },
            { productId: 104, quantity: 3 },
        ],
    },
];

function getCustomerStatistics(customers, products, orders) {
    let result = [];
    // Duyệt customer
    for (const customer of customers) {
        let totalSpent = 0;
        const customerProducts = [];
        // Duyệt oder
        for (const oder of orders) {
            // Duyệt oder có thuộc customer không
            if (customer.id === oder.customerId) {
                // Nếu có thì duyệt item
                for (const item of oder.items) {
                    // Tìm product trong product
                    const product = products.find(
                        (p) => p.id === item.productId,
                    );
                    // Cộng dồn tính total
                    totalSpent += product.price * item.quantity;
                    // Tìm xem customerProducts đã có sản phẩm này chưa
                    const found = customerProducts.find(
                        (spent) => product.name === spent.name,
                    );
                    // Nếu có
                    if (found) {
                        found.quantity += item.quantity;
                        found.totalSpent += product.price * item.quantity;
                    } else {
                        customerProducts.push({
                            name: product.name,
                            quantity: item.quantity,
                            totalSpent: product.price * item.quantity,
                        });
                    }
                }
            }
        }

        // sắp xếp giảm dần
        customerProducts.sort((a, b) => b.totalSpent - a.totalSpent);
        // Thêm vào mảng trả về
        result.push({
            id: customer.id,
            name: customer.name,
            totalSpent: totalSpent,
            products: customerProducts,
        });
    }
    // Trả về mảng và sắp xếp
    return result.sort((a, b) => b.totalSpent - a.totalSpent);
}

console.log(getCustomerStatistics(customers, products, orders));

function getCustomerStatistics(customers, products, orders) {
//     return customers
//         .map(function (customer) {
//             const customerOrders = orders.filter(function (order) {
//                 return order.customerId === customer.id;
//             });

//             // Lấy tất cả items
//             const allItems = customerOrders
//                 .map(function (order) {
//                     return order.items;
//                 })
//                 .reduce(function (total, items) {
//                     return total.concat(items);
//                 }, []);

//             // Gộp  trùng nhau
//             const mergedItems = allItems.reduce(function (total, item) {
//                 const existingItem = total.find(function (product) {
//                     return product.productId === item.productId;
//                 });

//                 if (existingItem) {
//                     existingItem.quantity += item.quantity;
//                 } else {
//                     total.push({
//                         productId: item.productId,
//                         quantity: item.quantity,
//                     });
//                 }

//                 return total;
//             }, []);

//             // Đổi thành name và tính totalSpent
//             const productList = mergedItems
//                 .map(function (item) {
//                     const productInfo = products.find(function (product) {
//                         return product.id === item.productId;
//                     });

//                     return {
//                         name: productInfo.name,
//                         quantity: item.quantity,
//                         totalSpent: productInfo.price * item.quantity,
//                     };
//                 })
//                 .sort(function (a, b) {
//                     return b.totalSpent - a.totalSpent;
//                 });

//             // Tổng tiền customer
//             const totalSpent = productList.reduce(function (total, product) {
//                 return total + product.totalSpent;
//             }, 0);

//             return {
//                 id: customer.id,
//                 name: customer.name,
//                 totalSpent: totalSpent,
//                 products: productList,
//             };
//         })
//         .sort(function (a, b) {
//             return b.totalSpent - a.totalSpent;
//         });
// }
// console.log(getCustomerStatistics(customers, products, orders));
