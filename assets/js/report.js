let person = document.getElementById("person");
let task = document.getElementById("task");

person.addEventListener("change", renderReport);
task.addEventListener("change", renderReport);

function renderReport(){
    let personVal = person.value;
    let taskVal = task.value;
    window.location.href = `/report/report?person=${personVal}&task=${taskVal}`;
}