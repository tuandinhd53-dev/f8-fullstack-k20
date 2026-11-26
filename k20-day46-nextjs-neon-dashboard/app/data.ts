import { neon } from "@neondatabase/serverless";

// Khởi tạo hàm truy vấn SQL kết nối tới Neon thông qua biến môi trường bí mật trong .env.local
// Dấu "!" cho biết db chắc chắn tồn tại
const sql = neon(process.env.DATABASE_URL!);

// Số lượng hóa đơn tối đa hiển thị trên mỗi trang
const limit = 5;

// Định nghĩa kiểu dữ liệu cho một dòng hóa đơn sau khi gộp bảng invoices và customers
export type Invoices = {
    id: number;
    name: string;
    amount: number;
    status: string;
    date: string;
};

// Lấy 5 hóa đơn mới nhất cho trang tổng quan (/dashboard)
export async function fetchLatestInvoices() {
    const data =
        await sql`SELECT invoices.id , customers.name  ,invoices.status ,invoices.amount ,invoices.date FROM invoices JOIN customers ON invoices.customer_id = customers.id ORDER BY invoices.date DESC ,invoices.id DESC LIMIT 5;`;

    return data as Invoices[];
}

// Lấy toàn bộ tên khách hàng cho trang (/dashboard/customers)
export async function fetchCustomers() {
    const data = await sql`SELECT name FROM customers ORDER BY id`;

    // Trả về mảng các object, mỗi object chứa thuộc tính name kiểu chuỗi
    return data as { name: string }[];
}

//  Tính tổng số trang dựa trên từ khóa tìm kiếm hiện tại
export async function fetchFilteredInvoices(
    search: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * limit;
    const data =
        await sql`SELECT invoices.id , customers.name , invoices.amount, invoices.status,invoices.date FROM invoices JOIN customers ON  invoices.customer_id = customers.id WHERE customers.name ILIKE ${`%${search}%`} ORDER BY invoices.date DESC , invoices.id DESC LIMIT ${limit} OFFSET ${offset}`;
    return data as Invoices[];
}

export async function fetchTotalPages(search: string) {
    const data =
        await sql`SELECT COUNT(*) AS total FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE customers.name ILIKE ${`%${search}%`};`;
    const totalInvoices = Number(data[0].total);
    return Math.ceil(totalInvoices / limit);
}
