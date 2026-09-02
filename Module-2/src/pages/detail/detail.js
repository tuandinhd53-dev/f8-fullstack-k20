const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const pathName = window.location.pathname;

console.log(id);
console.log(pathName);
