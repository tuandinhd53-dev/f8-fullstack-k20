const orders = [
    {
        id: 1,
        customer: "An",
        product: "Áo thun",
        category: "fashion",
        amount: 300000,
        status: "completed",
    },
    {
        id: 2,
        customer: "Bình",
        product: "iPhone 15",
        category: "electronics",
        amount: 25000000,
        status: "completed",
    },
    {
        id: 3,
        customer: "An",
        product: "Quần jean",
        category: "fashion",
        amount: 450000,
        status: "canceled",
    },
    {
        id: 4,
        customer: "Chi",
        product: "Tai nghe",
        category: "electronics",
        amount: 1200000,
        status: "completed",
    },
    {
        id: 5,
        customer: "Bình",
        product: "Giày",
        category: "fashion",
        amount: 900000,
        status: "pending",
    },
    {
        id: 6,
        customer: "An",
        product: "Sạc dự phòng",
        category: "electronics",
        amount: 350000,
        status: "completed",
    },
    {
        id: 7,
        customer: "Duy",
        product: "Áo khoác",
        category: "fashion",
        amount: 600000,
        status: "completed",
    },
];

// Hàm 1
function getRevenueByCategory(orders) {
    return orders.reduce((acc, order) => {
        if (order.status !== "completed") {
            return acc;
        }

        if (!acc[order.category]) {
            acc[order.category] = 0;
        }

        acc[order.category] += order.amount;

        return acc;
    }, {});
}
getRevenueByCategory(orders);
// {
//   fashion: 900000,       // 300000 + 600000 (đơn canceled bị loại)
//   electronics: 26550000, // 25000000 + 1200000 + 350000
// }


function getSpendingByCustomer(orders) {
    return orders.reduce((acc, order) => {
        if (order.status !== "completed") {
            return acc;
        }

        if (!acc[order.customer]) {
            acc[order.customer] = 0;
        }

        acc[order.customer] += order.amount;

        return acc;
    }, {});
}
getSpendingByCustomer(orders);
// {
//   An: 650000,      // 300000 + 350000
//   Bình: 25000000,
//   Chi: 1200000,
//   Duy: 600000,
// }


function getOrderCountByStatus(orders) {
    return orders.reduce((acc, order) => {
        if (!acc[order.status]) {
            acc[order.status] = 0;
        }

        acc[order.status]++;

        return acc;
    }, {});
}
getOrderCountByStatus(orders);
// { completed: 5, canceled: 1, pending: 1 }


function getTopCustomer(orders) {
    const result = orders.reduce(
        (acc, order) => {
            if (order.status !== "completed") {
                return acc;
            }

            if (!acc.spending[order.customer]) {
                acc.spending[order.customer] = 0;
            }

            acc.spending[order.customer] += order.amount;

            if (acc.spending[order.customer] > acc.top.total) {
                acc.top.customer = order.customer;
                acc.top.total = acc.spending[order.customer];
            }

            return acc;
        },
        {
            spending: {},
            top: {
                customer: "",
                total: 0,
            },
        },
    );

    return result.top;
}
getTopCustomer(orders);
// { customer: "Bình", total: 25000000 }


function getFullReport(orders) {
    return orders.reduce(
        (acc, order) => {
           
            if (!acc.statusCount[order.status]) {
                acc.statusCount[order.status] = 0;
            }

            acc.statusCount[order.status]++;

            
            if (order.status !== "completed") {
                return acc;
            }

            // revenueByCategory
            if (!acc.revenueByCategory[order.category]) {
                acc.revenueByCategory[order.category] = 0;
            }

            acc.revenueByCategory[order.category] += order.amount;

            // spendingByCustomer
            if (!acc.spendingByCustomer[order.customer]) {
                acc.spendingByCustomer[order.customer] = 0;
            }

            acc.spendingByCustomer[order.customer] += order.amount;

            // totalRevenue
            acc.totalRevenue += order.amount;

            return acc;
        },
        {
            revenueByCategory: {},
            spendingByCustomer: {},
            statusCount: {},
            totalRevenue: 0,
        },
    );
}
getFullReport(orders);
// {
//   revenueByCategory: { fashion: 900000, electronics: 26550000 },
//   spendingByCustomer: { An: 650000, Bình: 25000000, Chi: 1200000, Duy: 600000 },
//   statusCount: { completed: 5, canceled: 1, pending: 1 },
//   totalRevenue: 27450000
// }
