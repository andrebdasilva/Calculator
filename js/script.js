let previousNumber = "";
let currentNumber = "";
let operator = "";

const previousDisplay = document.querySelector("[data-previous-operand]");
const currentDisplay = document.querySelector("[data-current-operand]");
const numbers = document.querySelectorAll("[data-number]");
const decimal = document.querySelector("[data-decimal]");
const operators = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-clear]");
const allClear = document.querySelector("[data-all-clear]");
const del = document.querySelector("[data-delete]");

const handleNumber = number => {
	if (previousNumber !== "" && currentNumber !== "" && operator === "") {
		previousNumber = "";
		currentDisplay.textContent = currentNumber;
	};

	if (currentNumber.length <= 8) {
		currentNumber += number;
		currentDisplay.textContent = currentNumber;
	};
};

const handleOperator = ope => {
	if (previousNumber === "") {
		previousNumber = currentNumber;
		operatorCheck(ope);
	} else if (currentNumber === "") {
		operatorCheck(ope);
	} else {
		calculate();
		operator = ope;
		previousDisplay.textContent = previousNumber + " " + operator;
		currentDisplay.textContent = "0";
	};
};

const operatorCheck = (text) => {
	operator = text;
	previousDisplay.textContent = previousNumber + " " + operator;
	currentDisplay.textContent = "0";
	currentNumber = "";
};

const calculate = () => {
	previousNumber = Number(previousNumber);
	currentNumber = Number(currentNumber);
	if (operator === "+") {
		previousNumber += currentNumber;
	} else if (operator === "-") {
		previousNumber -= currentNumber;
	} else if (operator === "/") {
		previousNumber /= currentNumber;
	} else if (operator === "*") {
		if (currentNumber <= 0) {
			previousNumber = "error";
			displayResults();
			return;
		};
		previousNumber *= currentNumber;
	};

	previousNumber = previousNumber.toString();
	displayResults();
};

const roundNumber = (number) => {
	return Math.round(number * 10000) / 10000;
};

const displayResults = () => {
	if (previousNumber.length <= 8) {
		currentDisplay.textContent = previousNumber;
	} else {
		currentDisplay.textContent = previousNumber.slice(0, 8) + "...";
	};
	previousDisplay.textContent = "";
	operator = "";
	currentNumber = "";
};

const clearCalculator = () => {
	currentNumber = "";
	currentDisplay.textContent = "0";
};

const allClearCalculator = () => {
	currentNumber = "";
	previousNumber = "";
	operator = "";
	currentDisplay.textContent = "0";
	previousDisplay.textContent = "";
};

const addDecimal = () => {
	if (!currentNumber.includes(".")) {
		currentNumber += ".";
		currentDisplay.textContent = currentNumber;
	};
};

const handleDelete = ()=>{
	if(currentNumber != ""){
		currentNumber = currentNumber.slice(0,-1);
		currentDisplay.textContent = currentNumber;
		if(currentNumber === ""){
			currentDisplay.textContent = "0";
		};
	};

	if(currentNumber === "" && previousNumber !== "" && operator === ""){
		previousNumber = previousNumber.slice(0,-1);
		currentDisplay.textContent = previousNumber;
	};
};

const handleKeyPress = event => {
	event.preventDefault();

	if (event.key >= 0 && event.key <= 9) {
		handleNumber(event.key);
	};

	if (event.key === "Enter" || (event.key === "=" && currentNumber != "" && previousNumber != "")) {
		calculate();
	};

	if (event.key === "+" || event.key === "-" || event.key === "/" || event.key === "*" ) {
		handleOperator(event.key);
	};

	if(event.key === "."){
		addDecimal();
	};

	if(event.key === "Backspace"){
		handleDelete();
	};
};

numbers.forEach(number => {
	number.addEventListener("click", event => 
		handleNumber(event.target.textContent)
	);
});

operators.forEach(operator => {
	operator.addEventListener("click", event => {
		handleOperator(event.target.textContent)
	});
});

equals.addEventListener("click", () => {
	if (currentNumber != "" && previousNumber != "") {
		calculate();
	}
});

clear.addEventListener("click", clearCalculator);

allClear.addEventListener("click", allClearCalculator);

decimal.addEventListener("click", () => {
	addDecimal();
});

del.addEventListener("click", handleDelete);

window.addEventListener("keydown", handleKeyPress);