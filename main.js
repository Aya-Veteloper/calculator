const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const specialChars = ['+', '-', '%', '*', '=', '/'];
let output = '';

const calculate = (btnValue) => {
    display.focus();
    
    if (btnValue === "=" && output !== "") {
    // If output has '%', replace with '/100' before evaluating.
    output = eval(output.replace("%", "/100"));
    } else if (btnValue === "AC") {
    output = "";
    } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
    } else {
    // If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    
    // Check if the last character in the output and the current button value are special characters
    const lastChar = output.slice(-1);
    if (specialChars.includes(lastChar) && specialChars.includes(btnValue)) {
        displayError("Cannot use successive special characters!");
        return;
    }
    
    output += btnValue;
    }
    
    display.value = output;
}

const displayError = (message) => {
  // Create or update an error element to display the error message
    const errorElement = document.querySelector('.error');
    if (errorElement) {
    errorElement.textContent = message;
    } else {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = message;
    // Append the error element to the DOM (e.g., below the calculator display)
    display.parentElement.appendChild(errorDiv);
    }
}

buttons.forEach((btn) =>
    btn.addEventListener('click', (e) => {
    calculate(e.target.textContent);
    })
);
