let month = document.getElementById("monthR");
let year = document.getElementById("yearR");
let employee = document.getElementById("employeeR");

month.addEventListener("change", renderReport);
year.addEventListener("change", renderReport);
employee.addEventListener("change", renderReport);

console.log("working");
function renderReport(){
    let reqUser = employee.value;
    let reqMonth = month.value;
    let reqYear = year.value;

    window.location.href = `/report/reportH?reqUser=${reqUser}&reqMonth=${reqMonth}&reqYear=${reqYear}`;
}