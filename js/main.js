//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(5, 15);

function checkLength(string, maxLength) {
  if (maxLength > string.length) {
    return true;
  } else {
    return false;
  }
}

checkLength('Apple', 4);
