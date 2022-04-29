"use strict";

// Variables
let x = 0;
let y = 0;
let op = "";
let ans = 0;
let operating = false;
const prev = document.querySelector(".prev");
const current = document.querySelector(".current");
const btnContainer = document.querySelector(".buttons-container");

// Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = function (a, b, operation) {
  switch (operation) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid input";
  }
};

const formatNum = function (n) {
  const x = Math.floor(n);
  if (n === x) {
    return n;
  }
  return parseFloat(n.toFixed(10));
};

const displayNums = function (e) {
  // starting the second number
  if (op !== "" && !operating) {
    operating = true;
    current.textContent = "";
  }
  // start a new calculation
  if (ans !== 0) {
    ans = 0;
    prev.textContent = "";
    current.textContent = "";
  }
  // get rid of leading zero
  if (current.textContent === "0") {
    current.textContent = "";
  }
  current.textContent = `${current.textContent}${e.target.textContent}`;
};

const decimal = function () {
  if (current.textContent.includes(".")) {
    return;
  }
  current.textContent = `${current.textContent}.`;
};

const executeOp = function (e) {
  if (x == 0) {
    x = Number(current.textContent);
  }
  // continuing from a previous calculation
  if (ans !== 0) {
    x = ans;
    ans = 0;
  }
  // second op clicked before equals
  if (op != "") {
    x = operate(x, Number(current.textContent), op);
    current.textContent = formatNum(x);
    operating = false;
  }
  prev.textContent = `${current.textContent} ${e.target.textContent}`;
  op = e.target.textContent;
};

const equals = function () {
  y = Number(current.textContent);
  prev.textContent = `${prev.textContent} ${current.textContent} =`;
  ans = operate(x, y, op);
  current.textContent = formatNum(ans);
  op = "";
  x = 0;
  y = 0;
  operating = false;
};

const clear = function () {
  current.textContent = 0;
  prev.textContent = "";
  op = "";
  x = 0;
  y = 0;
  ans = 0;
  operating = false;
};

const backspace = function () {
  if (current.textContent.length === 1) {
    return 0;
  }
  return `${current.textContent.slice(0, -1)}`;
};

// Event listeners
btnContainer.addEventListener("click", function (e) {
  // clicking a number
  if (e.target.classList.contains("btn-num")) {
    displayNums(e);
  }

  // clicking decimal point
  if (e.target.classList.contains("btn-dec")) {
    decimal();
  }

  // clicking an operation
  if (e.target.classList.contains("btn-ops")) {
    executeOp(e);
  }

  // clicking equals
  if (e.target.classList.contains("btn-eq") && x !== 0 && op !== "") {
    equals();
  }

  // clicking clear
  if (e.target.classList.contains("btn-clear")) {
    clear();
  }

  // clicking ce
  if (e.target.classList.contains("btn-ce")) {
    current.textContent = 0;
  }

  // clicking backspace
  if (e.target.classList.contains("btn-back")) {
    current.textContent = backspace();
  }
});
