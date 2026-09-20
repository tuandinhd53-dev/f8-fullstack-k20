const sidebar = document.querySelector("#sidebar");
const resizer = document.querySelector("#sidebar-resizer");

if (sidebar && resizer) {
    let isResizing = false;

    const MIN_WIDTH = 240;
    const MAX_WIDTH = 420;

    resizer.addEventListener("pointerdown", (event) => {
        isResizing = true;

        resizer.setPointerCapture(event.pointerId);

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    });

    resizer.addEventListener("pointermove", (event) => {
        if (!isResizing) return;

        const newWidth = event.clientX;

        if (
            newWidth < MIN_WIDTH ||
            newWidth > MAX_WIDTH
        ) {
            return;
        }

        sidebar.style.width = `${newWidth}px`;
    });

    resizer.addEventListener("pointerup", () => {
        isResizing = false;

        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    });

    resizer.addEventListener("pointercancel", () => {
        isResizing = false;

        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    });
}