function validateInn(inn) {
  const error = { code: undefined, message: '' };

  if (typeof inn !== 'string') inn = inn.toString();

  if (!inn.length) {
    setError(1, 'ИНН пуст');
  } else if (!/^\d+$/.test(inn)) {
    setError(2, 'ИНН может состоять только из цифр');
  } else if (![10, 12].includes(inn.length)) {
    setError(3, 'ИНН может состоять только из 10 или 12 цифр');
  } else {
    const checkDigit = (coefficients) => {
      const sum = coefficients.reduce((acc, coef, i) => acc + coef * parseInt(inn[i]), 0);
      return parseInt(sum % 11 % 10);
    };

    switch (inn.length) {
      case 10:
        if (checkDigit([2, 4, 10, 3, 5, 9, 4, 6, 8]) === parseInt(inn[9])) setResult(true);
        break;
      case 12:
        const n11 = checkDigit([7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        const n12 = checkDigit([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) setResult(true);
        break;
    }

    if (!getResult()) setError(4, 'Неправильное контрольное число');
  }

  function setError(code, message) {
    error.code = code;
    error.message = message;
  }

  function getResult() {
    return error.code === undefined;
  }

  function setResult(value) {
    if (!value) setError(4, 'Неправильное контрольное число');
  }

  return error;
}

export default validateInn;
