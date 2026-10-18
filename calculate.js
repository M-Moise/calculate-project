const display = document.getElementById("user-input");
const buttons = document.querySelectorAll(".numbers, .operators");

const operate = ["+", "-", "*", "/", "%"];

function lastIsOperator() {
    const last = display.value.slice(-1);
    return operate.includes(last);
}


buttons.forEach(function (button) {
button.addEventListener("click", function (e){
    e.preventDefault();
    const key = e.target.innerText.trim();

    if (key === "AC"){
        display.value = "";
        return;
    }

    if(key === "DEL"){
        display.value = display.value.slice(0, -1);
        return;
    }

    if (key === "="){
        if(display === "" || lastIsOperator()) return;
        try{
            display.value =eval(display.value);
        }
        catch (error){
            display.value = "Error";
        }
        return;
    }
    

    if(operate.includes(key)){
        if(display.value === " " || display.value === "Error") return;
        if(lastIsOperator()){
            display.value = display.value.slice(0, -1) + key;
        }
        else{
            display.value += key;
        }
        return;
    }

    if(display.value === "Error") display.value = "";
    display.value += key;

})
})