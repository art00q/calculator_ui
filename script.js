'use strict'

const UI_ELEMENTS = {
  buttons: document.querySelectorAll('.button'),
  display: document.querySelector('.calculator__display__result'),
  operations: document.querySelector('.operation'),
};

const cache = {
  arg1: '',
  arg2: '',
  operation: null,
  result: null,
};

UI_ELEMENTS.buttons.forEach((button) => {
  button.addEventListener('click', () => {
    changeCache(button);
  })
});

function changeTextInDisplay(text) {
  UI_ELEMENTS.display.textContent = text
}

function calculate(arg1, arg2, operation) {
  const isGivenNumbersAreNotNan = !isNaN(arg1) && !isNaN(arg2);

  function makeNumberRoundedAndShorter(number) {
    return Math.round(number).toFixed(0)
  }

  if (isGivenNumbersAreNotNan) {
    switch (operation) {
      case '÷':
        return makeNumberRoundedAndShorter(arg1 / arg2)
      case 'x':
        return makeNumberRoundedAndShorter(arg1 * arg2)
      case '-':
        return makeNumberRoundedAndShorter(arg1 - arg2)
      case '+':
        return makeNumberRoundedAndShorter(arg1 + arg2)
    }
  }
}

function getOperation(operation) {
  const isButtonOperation = operation.classList.contains('operation');

  if (isButtonOperation) {
    return operation.textContent
  }

  return null
}

function changeCache(button) {
  const isFirstArgumentNotSet = cache.arg1 === '';
  const isSecondArgumentNotSet = cache.arg2 === '';
  const isButtonOperation = button.classList.contains('operation');
  const isOperationExists = cache.operation !== null;
  const isButtonDelete = button.classList.contains('delete');
  const isButtonClear = button.classList.contains('clear');
  const isButtonEqual = button.classList.contains('equal');
  const buttonValue = button.textContent;

  if (isButtonClear) {
    clearCache();
    changeTextInDisplay('0');

    return
  }

  if (isButtonEqual) {
    cache.result = calculate(+cache.arg1, +cache.arg2, cache.operation);
    changeTextInDisplay(cache.result);

    clearCache();
    return
  }

  if (!isFirstArgumentNotSet && !isButtonOperation && isOperationExists) {
    if (isButtonDelete) {
      cache.arg2 = cache.arg2.slice(0, cache.arg2.length - 1);
      changeTextInDisplay(cache.arg2);

      return
    }

    cache.arg2 += buttonValue;
    changeTextInDisplay(cache.arg2);

    return
  }

  if (isSecondArgumentNotSet && !isButtonOperation) {
    if (isButtonDelete) {
      cache.arg1 = cache.arg1.slice(0, cache.arg1.length - 1);
      changeTextInDisplay(cache.arg1);

      return
    }

    cache.arg1 += buttonValue;
    changeTextInDisplay(cache.arg1);
  }

  if (!isFirstArgumentNotSet && isButtonOperation) {
    cache.operation = buttonValue;
    changeTextInDisplay(cache.operation);
  }
}

function clearCache() {
  cache.arg1 = '';
  cache.arg2 = '';
  cache.operation = null;
}