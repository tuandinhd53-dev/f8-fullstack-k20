const todoInput = document.querySelector("#todo-input");
const todoButton = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");

// Cập nhật số lượng chx hoàn thành
function updateCount() {
    const spans = document.querySelectorAll("#todo-list span");

    let count = 0;

    spans.forEach((span) => {
        if (!span.classList.contains("line-through")) {
            count++;
        }
    });

    todoCount.textContent = `Còn ${count} việc chưa xong`;
}

function addTodo() {
    // Lấy nội dung và xóa khoảng trắng
    const inputText = todoInput.value.trim();

    // Kiểm tra xem có phải chuỗi "" không
    if (inputText === "") {
        return;
    }

    // Lấy tất cả todo hiện có
    const todos = document.querySelectorAll("#todo-list span");

    let isDuplicate = false;

    // Kiểm tra trùng
    todos.forEach((todo) => {
        if (todo.textContent === inputText) {
            isDuplicate = true;
        }
    });

    if (isDuplicate) {
        console.log("Đã có");
        todoInput.value = "";
        todoInput.focus();
        return;
    }

    // Tạo li

    const li = document.createElement("li");

    li.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "bg-gray-100",
        "p-3",
        "rounded-lg",
    );

    // Tạo nội dung
    const span = document.createElement("span");

    span.textContent = inputText;

    // Tạo nút Xóa
    const button = document.createElement("button");
    // Css button
    button.classList.add(
        "bg-red-500",
        "text-white",
        "px-3",
        "py-1",
        "rounded",
        "hover:bg-red-600",
    );
    button.textContent = "Xóa";

    // Thêm nội dung và nút xóa vào li
    li.append(span, button);

    // Thêm li vào danh sách
    todoList.append(li);

    // Xóa todo
    button.addEventListener("click", function () {
        button.closest("li").remove();
        updateCount();
    });

    // Hoàn thành todo
    span.addEventListener("click", function () {
        span.classList.toggle("line-through");
        span.classList.toggle("opacity-50");
        updateCount();
    });

    // Reset input và cập nhật todo
    todoInput.value = "";
    todoInput.focus();
    updateCount();
}

// Click tạo thêm todo
todoButton.addEventListener("click", function () {
    addTodo();
});

// Nhấn enter thêm
todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});
