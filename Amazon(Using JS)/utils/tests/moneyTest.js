import { formatCurrencey } from "../money.js";

console.log("test suite : formatCurrencey");

console.log('converts cents to dollers');
if(formatCurrencey(2095) === '20.95'){
  console.log('passed');
}
else{
  console.log('failed');
}

console.log('work\'s with 0');
if(formatCurrencey(0) === '0.00'){
  console.log('passed');
}
else{
  console.log('failed');
}

console.log('rounds decimals to upperdoller value');
if(formatCurrencey(2095.5) === '20.96'){
  console.log('passed');
}
else{
  console.log('failed');
}

console.log('rounds decimals to lowerdoller value');
if(formatCurrencey(2094.4) === '20.94'){
  console.log('passed');
}
else{
  console.log('failed');
}