let tbody = document.getElementById("tbody");
let delBox = document.getElementById("delBox");
let deleteInput = document.getElementById("deleteInput");
let delBtn = document.getElementById("delBtn");
let calBtn = document.getElementById("calBtn");
let mobileNum = document.getElementById("mobileNum");

function handleDelete(e) {
    const id = e.target.dataset.id;
    const mobile = e.target.dataset.mobile;
    if (!id) {
        return;
    }
    

    delBox.style.display = "block";
    mobileNum.innerText = mobile;
}

calBtn.addEventListener("click", ()=>{
    delBox.style.display = "none";
});

delBtn.addEventListener("click", ()=>{
    let inputNum = deleteInput.value;
    let mobileStr = mobileNum.innerText;
    if(inputNum == mobileStr){
        delBox.style.display = "none";
        window.location.href = `/users/delete?mobile=${inputNum}`;
    }
});



tbody.addEventListener("click", handleDelete);