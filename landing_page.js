const formEl = document.querySelector("form");
const pOutput = document.querySelector(".output");

formEl.addEventListener("submit", onSubmit);


function onSubmit(e) {
    e.preventDefault();
    const lift = document.getElementById("lift-name").value;
    pOutput.innerHTML = "";
    pOutput.innerHTML = "<p>" + lift + "</p>";
}
