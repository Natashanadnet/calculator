"use strict";

let ans = 0;
let inputNum = "";
let num1 = "";
let num2 = "";
let currentOperation = [];
let currentOperator = "";
let value = "";
let operands = "/*-+";
const numKeys = document.querySelectorAll(".btn-num");
const opeKeys = document.querySelectorAll(".btn-ope");
const equalKey = document.querySelectorAll(".btn-equal");
const screenHist = document.querySelector(".hist");
const screenAns = document.querySelector(".result");
const deleteBtn = document.querySelector(".btn-delete");
const clearBtn = document.querySelector(".btn-clear");
const decimalBtn = document.querySelector(".btn-deci");
const equalBtn = document.querySelector(".btn-equal");
const allBtn = document.querySelectorAll(".btn");

//FUNCTIONS
function numbers(value) {
  inputNum += value;
  updateScreenResult(inputNum);
}

function numChecker() {
  if (inputNum !== "") {
    if (inputNum[inputNum.length - 1] === ".") {
      inputNum = inputNum.slice(0, -1);
    }
    inputNum = lengthChecker(+inputNum);
    num1 === "" ? (num1 = inputNum) : (num2 = inputNum);
    inputNum = "";
  }
  num1 === "" ? (num1 = ans) : (num1 = num1);
}

function lengthChecker(num) {
  let stringNum = num.toString();
  if (stringNum.includes(".")) {
    return num.toFixed(2);
  }
  return stringNum;
}

function operators(value) {
  if (currentOperation[currentOperation.length - 1] === "=") {
    num2 = "";
  }
  numChecker();
  if (num2 === "") {
    currentOperator = value;
    currentOperation = [num1, value];
  } else {
    currentOperation.push(num2);
    ans = calculate(+num1, +num2, currentOperator);
    ans = lengthChecker(ans);
    num2 = "";
    num1 = "";
    checkAns();
    updateScreenResult(ans);
    operators(value);
  }
  updateScreenHist();
}

function updateScreenResult(value) {
  screenAns.textContent = value;
}

function updateScreenHist() {
  screenHist.textContent = currentOperation.join("");
}

function clear() {
  location.reload();
}

function deleteLastChar() {
  if (inputNum !== "") {
    inputNum = inputNum.slice(0, -1);
    updateScreenResult(inputNum);
  }
}

function addDecimal() {
  if (!inputNum.includes(".")) {
    inputNum === "" ? (inputNum = "0.") : (inputNum += ".");
    updateScreenResult(inputNum);
  }
}

function equal() {
  numChecker();
  if (num2 === "") {
    ans = num1;
    currentOperation = [num1, "="];
    num1 = "";
  } else {
    ans = calculate(+num1, +num2, currentOperator);
    ans = lengthChecker(ans);
    currentOperation = [num1, currentOperator, num2, "="];
    num1 = ans;
    checkAns();
  }
  updateScreenHist();
  updateScreenResult(ans);
}

function checkAns() {
  if (!isFinite(ans)) {
    ans = "Error";
    numKeys.forEach((key) => {
      key.removeEventListener("click", numValues);
    });
    opeKeys.forEach((key) => {
      key.removeEventListener("click", opeValues);
    });
    deleteBtn.removeEventListener("click", deleteLastChar);
    equalBtn.removeEventListener("click", equal);
    decimalBtn.removeEventListener("click", addDecimal);
    window.removeEventListener("keydown", keyCapture);
    allBtn.forEach((key) => {
      key.classList.add("error");
    });
    clearBtn.classList.remove("error");
  }
}

function calculate(num1, num2, currentOperator) {
  let result;
  switch (currentOperator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "*":
      result = num1 * num2;
  }
  return result;
}

function numValues(e) {
  numbers(e.target.value);
}
function opeValues(e) {
  operators(e.target.value);
}

function keyCapture(e) {
  value = e.key;
  if (!isNaN(value)) {
    numbers(value);
  } else if (value === ".") {
    addDecimal();
  } else if (value === "Enter") {
    equal();
  } else if (operands.includes(value)) {
    operators(value);
  } else if (value === "Backspace") {
    deleteLastChar();
  } else if (value === "Delete") {
    clear();
  }
}

//EVENT HANDLERS

numKeys.forEach((key) => {
  key.addEventListener("click", numValues);
});

opeKeys.forEach((key) => {
  key.addEventListener("click", opeValues);
});

clearBtn.addEventListener("click", clear);

deleteBtn.addEventListener("click", deleteLastChar);

decimalBtn.addEventListener("click", addDecimal);

equalBtn.addEventListener("click", equal);

window.addEventListener("keydown", keyCapture);
