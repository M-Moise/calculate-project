const display = document.getElementById("user-input");
const buttons = document.querySelectorAll(".numbers, .operators");

const operators = ["+", "-", "*", "/", "%"];

// helper: is the last character in the display an operator?
function lastIsOperator() {
    const last = display.value.slice(-1);
    return operators.includes(last);
}

buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        e.preventDefault();                      // stop the form from reloading the page
        const key = e.target.innerText.trim();   // the text on the button that was clicked

        // 1. Clear everything
        if (key === "AC") {
            display.value = "";
            return;
        }

        // 2. Delete the last character
        if (key === "DEL") {
            display.value = display.value.slice(0, -1);
            return;
        }

        // 3. Calculate the result
        if (key === "=") {
            if (display.value === "" || lastIsOperator()) return;  // nothing valid to calculate
            try {
                display.value = eval(display.value);
            } catch (error) {
                display.value = "Error";
            }
            return;
        }

        // 4. Operators (+ - * / %)
        if (operators.includes(key)) {
            if (display.value === "" || display.value === "Error") return;  // can't start with an operator
            if (lastIsOperator()) {
                // replace the old operator with the new one
                display.value = display.value.slice(0, -1) + key;
            } else {
                display.value += key;
            }
            return;
        }

        // 5. Otherwise it's a number (0-9, 00, .)
        if (display.value === "Error") display.value = "";
        display.value += key;
    });
});