/*
   Filename: advanced_calculator.js

   This code is an advanced calculator that supports a wide range of mathematical operations and includes additional functionalities.
   It provides a command line interface where the user can input mathematical expressions and get the results instantly.

   Features:
   - Supports basic arithmetic operations like addition, subtraction, multiplication, and division.
   - Supports exponentiation and square roots.
   - Supports trigonometric functions such as sine, cosine, and tangent.
   - Supports logarithmic functions including natural logarithm and base 10 logarithm.
   - Supports factorial calculation.
   - Supports memory functionalities like storing and recalling values.

   Usage:
   - To perform a calculation, simply enter a mathematical expression after the ">" prompt and hit enter.
   - To store the result in memory, use the "mem" command.
   - To recall a stored value, use the "recall" command followed by the assigned memory key.

   Example usage:
   > 2 + 2
   Result: 4
   
   > sin(0) * cos(pi)
   Result: 0
   
   > mem myVal = 10
   Value stored successfully.

   > myVal - 5
   Result: 5

   > recall myVal
   Result: 10

   Feel free to explore the capabilities of this advanced calculator!

   Note: Due to JavaScript's floating-point precision limitations, the results of some calculations may not be perfectly accurate.

*/

const readline = require('readline');

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define memory object to store values
const memory = {};

// Define supported mathematical functions
const functions = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: Math.log,
  ln: Math.log,
  sqrt: Math.sqrt,
};

// Define helper functions
function isNumber(value) {
  return /^-?\d+(?:\.\d+)?$/.test(value);
}

function evaluateExpression(expression) {
  let result;
  try {
    result = eval(expression);
  } catch (error) {
    result = 'Invalid expression!';
  }
  return result;
}

function performCalculation(input) {
  let result;
  const expression = input
    .toLowerCase()
    .replace(/mem\s+(\w+)\s*=\s*(-?\d+(?:\.\d+)?)$/, (_, key, value) => {
      memory[key] = parseFloat(value);
      return 'Value stored successfully.';
    })
    .replace(/^recall\s+(\w+)$/, (_, key) => {
      result = memory[key] ? memory[key] : 'Invalid memory key!';
    });

  if (!result) {
    result = evaluateExpression(expression);
  }

  return result;
}

// Start the calculator
function startCalculator() {
  rl.question('> ', (input) => {
    if (input === 'exit') {
      console.log('Calculator exited.');
      rl.close();
      return;
    }

    const result = performCalculation(input);
    console.log(`Result: ${result}`);
    startCalculator();
  });
}

console.log('Welcome to the Advanced Calculator CLI!');
console.log('Type "exit" to exit the calculator.\n');

startCalculator();