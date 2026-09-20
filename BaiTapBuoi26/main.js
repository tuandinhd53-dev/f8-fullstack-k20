/* =========================================================
   CÂU 1 — TODO APP
========================================================= */

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoError = document.querySelector("#todo-error");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const todoCount = document.querySelector("#todo-count");
const deleteCompletedBtn =
    document.querySelector("#delete-completed");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* =========================
   DATA
========================= */

let todos = [
    {
        id: 1,
        content: "Học JavaScript DOM",
        completed: true,
        deleted: false,
    },

    {
        id: 2,
        content: "Làm bài tập Todo",
        completed: false,
        deleted: false,
    },

    {
        id: 3,
        content: "Học Event Delegation",
        completed: false,
        deleted: false,
    },
];

let currentFilter = "all";


/* =========================
   ERROR
========================= */

function showTodoError(message) {
    todoError.textContent = message;
}

function clearTodoError() {
    todoError.textContent = "";
}


/* =========================
   GET VISIBLE TODOS
========================= */

function getVisibleTodos() {
    const activeTodos = todos.filter(
        (todo) => !todo.deleted
    );

    if (currentFilter === "active") {
        return activeTodos.filter(
            (todo) => !todo.completed
        );
    }

    if (currentFilter === "completed") {
        return activeTodos.filter(
            (todo) => todo.completed
        );
    }

    return activeTodos;
}


/* =========================
   RENDER TODOS
========================= */

function renderTodos() {
    const visibleTodos = getVisibleTodos();

    todoList.innerHTML = "";


    /* Empty state */

    emptyMessage.classList.toggle(
        "hidden",
        visibleTodos.length > 0
    );


    /* Render từng Todo */

    visibleTodos.forEach((todo) => {

        const todoItem =
            document.createElement("div");

        todoItem.dataset.id = todo.id;

        todoItem.className =
            "todo-item group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-sm";


        /* Nếu completed */

        if (todo.completed) {
            todoItem.classList.add(
                "bg-slate-50"
            );
        }


        todoItem.innerHTML = `
            <input
                type="checkbox"
                data-action="toggle"
                ${todo.completed ? "checked" : ""}
                class="h-5 w-5 cursor-pointer accent-indigo-600"
            />

            <span
                data-action="edit"
                class="
                    todo-content
                    flex-1
                    cursor-pointer
                    break-words
                    text-sm
                    font-medium
                    ${
                        todo.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                    }
                "
                title="Double click để chỉnh sửa"
            >
                ${todo.content}
            </span>

            <button
                type="button"
                data-action="delete"
                class="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
                Xoá
            </button>
        `;

        todoList.appendChild(todoItem);
    });


    updateTodoCount();

    updateDeleteCompletedButton();
}


/* =========================
   ADD TODO
========================= */

function addTodo() {
    const content = todoInput.value.trim();


    /* Không cho phép rỗng */

    if (!content) {
        showTodoError(
            "Vui lòng nhập nội dung todo!"
        );

        todoInput.focus();

        return;
    }


    clearTodoError();


    /* Thêm vào cuối mảng */

    todos.push({
        id: Date.now(),
        content,
        completed: false,
        deleted: false,
    });


    /* Reset input */

    todoInput.value = "";


    /* Render lại UI */

    renderTodos();


    /* Focus lại input */

    todoInput.focus();
}


/* =========================
   FORM SUBMIT
========================= */

todoForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        addTodo();
    }
);


/* =========================================================
   EVENT DELEGATION — TOGGLE
========================================================= */

todoList.addEventListener(
    "change",
    (event) => {

        const target = event.target;


        /* Không phải checkbox */

        if (
            target.dataset.action !== "toggle"
        ) {
            return;
        }


        /* Tìm Todo cha */

        const todoItem =
            target.closest(".todo-item");

        const id =
            Number(todoItem.dataset.id);


        /* Tìm object trong mảng */

        const todo =
            todos.find(
                (todo) => todo.id === id
            );


        if (!todo) {
            return;
        }


        /* Cập nhật trạng thái */

        todo.completed =
            target.checked;


        renderTodos();
    }
);


/* =========================================================
   EVENT DELEGATION — DELETE
========================================================= */

todoList.addEventListener(
    "click",
    (event) => {

        const target = event.target;


        if (
            target.dataset.action !== "delete"
        ) {
            return;
        }


        const todoItem =
            target.closest(".todo-item");

        const id =
            Number(todoItem.dataset.id);


        const todo =
            todos.find(
                (todo) => todo.id === id
            );


        if (!todo) {
            return;
        }


        const confirmed =
            confirm(
                `Bạn có chắc muốn xoá "${todo.content}"?`
            );


        if (!confirmed) {
            return;
        }


        /*
            Soft Delete:
            Không xoá object khỏi mảng.
            Chỉ đánh dấu deleted = true.
        */

        todo.deleted = true;


        renderTodos();
    }
);


/* =========================================================
   FILTER
========================================================= */

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.filter;


                /* Reset tất cả button */

                filterButtons.forEach(
                    (btn) => {

                        btn.classList.remove(
                            "bg-indigo-600",
                            "text-white"
                        );

                        btn.classList.add(
                            "bg-slate-100",
                            "text-slate-600"
                        );
                    }
                );


                /* Active button */

                button.classList.remove(
                    "bg-slate-100",
                    "text-slate-600"
                );

                button.classList.add(
                    "bg-indigo-600",
                    "text-white"
                );


                renderTodos();
            }
        );
    }
);


/* =========================================================
   COUNT
========================================================= */

function updateTodoCount() {

    const activeTodos =
        todos.filter(
            (todo) => !todo.deleted
        );


    const completedCount =
        activeTodos.filter(
            (todo) => todo.completed
        ).length;


    todoCount.textContent =
        `${completedCount}/${activeTodos.length} mục đã hoàn thành`;
}


/* =========================================================
   DELETE COMPLETED BUTTON
========================================================= */

function updateDeleteCompletedButton() {

    const hasCompletedTodo =
        todos.some(
            (todo) =>
                !todo.deleted &&
                todo.completed
        );


    deleteCompletedBtn.classList.toggle(
        "hidden",
        !hasCompletedTodo
    );
}


deleteCompletedBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Bạn có chắc muốn xoá tất cả todo đã hoàn thành?"
            );


        if (!confirmed) {
            return;
        }


        todos.forEach(
            (todo) => {

                if (
                    todo.completed &&
                    !todo.deleted
                ) {
                    todo.deleted = true;
                }
            }
        );


        renderTodos();
    }
);


/* =========================================================
   EDIT TODO
========================================================= */

todoList.addEventListener(
    "dblclick",
    (event) => {

        const target = event.target;


        if (
            target.dataset.action !== "edit"
        ) {
            return;
        }


        const todoItem =
            target.closest(".todo-item");

        const id =
            Number(todoItem.dataset.id);


        const todo =
            todos.find(
                (todo) => todo.id === id
            );


        if (!todo) {
            return;
        }


        const oldContent =
            todo.content;


        /* Tạo input */

        const input =
            document.createElement("input");


        input.type = "text";

        input.value = oldContent;

        input.className =
            "todo-edit-input flex-1 rounded-lg border border-indigo-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100";


        /* Thay span bằng input */

        target.replaceWith(input);


        input.focus();

        input.select();


        let isFinished = false;


        /* =========================
           SAVE
        ========================== */

        function saveEdit() {

            if (isFinished) {
                return;
            }


            const newContent =
                input.value.trim();


            if (!newContent) {

                showTodoError(
                    "Nội dung không được để trống!"
                );

                input.focus();

                return;
            }


            isFinished = true;

            clearTodoError();


            todo.content =
                newContent;


            renderTodos();
        }


        /* =========================
           CANCEL
        ========================== */

        function cancelEdit() {

            if (isFinished) {
                return;
            }


            isFinished = true;

            clearTodoError();

            renderTodos();
        }


        /* =========================
           KEYBOARD
        ========================== */

        input.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {
                    event.preventDefault();

                    saveEdit();
                }


                if (
                    event.key === "Escape"
                ) {
                    event.preventDefault();

                    cancelEdit();
                }
            }
        );


        /* =========================
           BLUR
        ========================== */

        input.addEventListener(
            "blur",
            saveEdit
        );
    }
);


/* Render Todo lần đầu */

renderTodos();


/* =========================================================
   CÂU 2 — TABS
========================================================= */

const tabs =
    document.querySelector("#tabs");

const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabPanels =
    document.querySelectorAll(".tab-panel");


let activeTabIndex = 0;


/* =========================
   CHANGE TAB
========================= */

function changeTab(index) {

    activeTabIndex = index;


    /* Button */

    tabButtons.forEach(
        (button, buttonIndex) => {

            const isActive =
                buttonIndex ===
                activeTabIndex;


            button.classList.toggle(
                "border-indigo-600",
                isActive
            );

            button.classList.toggle(
                "text-indigo-600",
                isActive
            );


            button.classList.toggle(
                "border-transparent",
                !isActive
            );

            button.classList.toggle(
                "text-slate-500",
                !isActive
            );
        }
    );


    /* Panel */

    tabPanels.forEach(
        (panel) => {

            const isActive =
                panel.dataset.panel ===
                tabButtons[
                    activeTabIndex
                ].dataset.tab;


            panel.classList.toggle(
                "hidden",
                !isActive
            );
        }
    );
}


/* =========================
   CLICK TAB
========================= */

tabButtons.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                changeTab(index);

                tabs.focus();
            }
        );
    }
);


/* =========================
   KEYBOARD
========================= */

function handleTabKeyboard(event) {

    if (
        event.key === "ArrowRight"
    ) {

        event.preventDefault();


        const nextIndex =
            (
                activeTabIndex + 1
            ) %
            tabButtons.length;


        changeTab(nextIndex);
    }


    if (
        event.key === "ArrowLeft"
    ) {

        event.preventDefault();


        const previousIndex =
            (
                activeTabIndex -
                1 +
                tabButtons.length
            ) %
            tabButtons.length;


        changeTab(previousIndex);
    }
}


/* Khi focus vào tabs */

tabs.addEventListener(
    "focusin",
    () => {

        tabs.addEventListener(
            "keydown",
            handleTabKeyboard
        );
    }
);


/* Khi focus rời khỏi tabs */

tabs.addEventListener(
    "focusout",
    (event) => {

        if (
            !tabs.contains(
                event.relatedTarget
            )
        ) {

            tabs.removeEventListener(
                "keydown",
                handleTabKeyboard
            );
        }
    }
);


/* =========================================================
   CÂU 3 — INFINITE CAROUSEL
========================================================= */

const slider =
    document.querySelector("#slider");

const slidesContainer =
    document.querySelector("#slides");

const prevButton =
    document.querySelector("#prev-btn");

const nextButton =
    document.querySelector("#next-btn");

const dotsContainer =
    document.querySelector("#dots");

const currentSlideElement =
    document.querySelector("#current-slide");

const totalSlideElement =
    document.querySelector("#total-slide");


/* =========================
   ORIGINAL IMAGES
========================= */

const images = [

    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
];


totalSlideElement.textContent =
    images.length;


/* =========================
   CLONE SLIDES
========================= */

/*
    [5, 1, 2, 3, 4, 5, 1]

    index:
    0 = clone 5
    1 = real 1
    2 = real 2
    3 = real 3
    4 = real 4
    5 = real 5
    6 = clone 1
*/

const slides = [

    images[
        images.length - 1
    ],

    ...images,

    images[0],
];


let currentIndex = 1;

let isAnimating = false;

let autoPlayId;


/* =========================================================
   RENDER SLIDES
========================================================= */

function renderSlides() {

    slidesContainer.innerHTML = "";


    slides.forEach(
        (image, index) => {

            const slide =
                document.createElement("div");


            slide.className =
                "min-w-full shrink-0";


            slide.innerHTML = `
                <img
                    src="${image}"
                    alt="Slide ${index + 1}"
                    class="block h-[300px] w-full object-cover sm:h-[450px]"
                />
            `;


            slidesContainer.appendChild(
                slide
            );
        }
    );
}


/* =========================================================
   RENDER DOTS
========================================================= */

function renderDots() {

    dotsContainer.innerHTML = "";


    images.forEach(
        (_, index) => {

            const dot =
                document.createElement("button");


            dot.type = "button";

            dot.dataset.index = index;

            dot.setAttribute(
                "aria-label",
                `Go to slide ${index + 1}`
            );


            dot.className =
                "dot h-3 w-3 rounded-full bg-white/60 transition-all duration-200 hover:bg-white";


            dotsContainer.appendChild(
                dot
            );
        }
    );
}


/* =========================================================
   UPDATE SLIDER
========================================================= */

function updateSlider(
    animate = true
) {

    slidesContainer.style.transition =
        animate
            ? "transform 0.4s ease"
            : "none";


    slidesContainer.style.transform =
        `translateX(-${currentIndex * 100}%)`;


    updateIndicator();
}


/* =========================================================
   UPDATE COUNTER + DOT
========================================================= */

function updateIndicator() {

    let realIndex =
        currentIndex - 1;


    if (realIndex < 0) {

        realIndex =
            images.length - 1;
    }


    if (
        realIndex >= images.length
    ) {

        realIndex = 0;
    }


    currentSlideElement.textContent =
        realIndex + 1;


    const dots =
        dotsContainer.querySelectorAll(
            ".dot"
        );


    dots.forEach(
        (dot, index) => {

            const isActive =
                index === realIndex;


            dot.classList.toggle(
                "bg-white",
                isActive
            );


            dot.classList.toggle(
                "bg-white/60",
                !isActive
            );


            dot.classList.toggle(
                "scale-125",
                isActive
            );
        }
    );
}


/* =========================================================
   NEXT
========================================================= */

function nextSlide() {

    if (isAnimating) {
        return;
    }


    isAnimating = true;

    currentIndex++;


    updateSlider(true);
}


/* =========================================================
   PREVIOUS
========================================================= */

function previousSlide() {

    if (isAnimating) {
        return;
    }


    isAnimating = true;

    currentIndex--;


    updateSlider(true);
}


/* =========================================================
   INFINITE LOOP
========================================================= */

slidesContainer.addEventListener(
    "transitionend",
    () => {

        /*
            Đang ở clone đầu tiên
            [5, 1, 2, 3, 4, 5, 1]
             ↑

            Nhảy về real slide 5
        */

        if (
            currentIndex === 0
        ) {

            currentIndex =
                images.length;

            updateSlider(false);
        }


        /*
            Đang ở clone cuối
            [5, 1, 2, 3, 4, 5, 1]
                                  ↑

            Nhảy về real slide 1
        */

        if (
            currentIndex ===
            slides.length - 1
        ) {

            currentIndex = 1;

            updateSlider(false);
        }


        isAnimating = false;
    }
);


/* =========================================================
   NEXT BUTTON
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        nextSlide();

        resetAutoPlay();

        slider.focus();
    }
);


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

prevButton.addEventListener(
    "click",
    () => {

        previousSlide();

        resetAutoPlay();

        slider.focus();
    }
);


/* =========================================================
   DOT CLICK
========================================================= */

dotsContainer.addEventListener(
    "click",
    (event) => {

        const dot =
            event.target.closest(".dot");


        if (!dot) {
            return;
        }


        if (isAnimating) {
            return;
        }


        const realIndex =
            Number(dot.dataset.index);


        /*
            Real index:
            0 → slider index 1
            1 → slider index 2
            ...
        */

        currentIndex =
            realIndex + 1;


        updateSlider(true);


        resetAutoPlay();


        slider.focus();
    }
);


/* =========================================================
   KEYBOARD
========================================================= */

function handleSliderKeyboard(
    event
) {

    if (
        event.key === "ArrowRight"
    ) {

        event.preventDefault();

        nextSlide();

        resetAutoPlay();
    }


    if (
        event.key === "ArrowLeft"
    ) {

        event.preventDefault();

        previousSlide();

        resetAutoPlay();
    }
}


/* Focus vào slider */

slider.addEventListener(
    "focusin",
    () => {

        slider.addEventListener(
            "keydown",
            handleSliderKeyboard
        );
    }
);


/* Rời khỏi slider */

slider.addEventListener(
    "focusout",
    (event) => {

        if (
            !slider.contains(
                event.relatedTarget
            )
        ) {

            slider.removeEventListener(
                "keydown",
                handleSliderKeyboard
            );
        }
    }
);


/* =========================================================
   AUTOPLAY
========================================================= */

function startAutoPlay() {

    stopAutoPlay();


    autoPlayId =
        setInterval(
            () => {

                nextSlide();

            },
            3000
        );
}


function stopAutoPlay() {

    clearInterval(autoPlayId);
}


function resetAutoPlay() {

    stopAutoPlay();

    startAutoPlay();
}


/* =========================================================
   HOVER PAUSE
========================================================= */

slider.addEventListener(
    "mouseenter",
    () => {

        stopAutoPlay();
    }
);


slider.addEventListener(
    "mouseleave",
    () => {

        startAutoPlay();
    }
);


/* =========================================================
   INITIAL RENDER
========================================================= */

renderSlides();

renderDots();

updateSlider(false);

startAutoPlay();