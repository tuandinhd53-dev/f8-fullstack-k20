const pathName = window.location.pathname;

if (pathName === "/" || pathName === "/index.html") {
    import("./pages/home/home.js");
} else if (pathName === "/detail.html") {
    import("./pages/detail/detail.js");
}
