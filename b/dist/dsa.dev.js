"use strict";

// let arr = [1,2,-3,2,7,-34]
// let ar = []
// for(let i = 0; i < arr.length;i++ ){
//     if(arr[i] > 0){
//         ar.push(arr[i])
//     }
// }
// console.log(ar);
// function findLargestNumber(arr){
//     let n = 0
//     for(let value in arr){
//         if(arr[value] > n){
//             n = arr[value]
//         }
//     }
//     return n
// }
// let largestNumber = findLargestNumber(arr)
// console.log(largestNumber);
var ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var sing = "#";
var newarr = [];
var counts = 0;
var middle = ar.at(-1) / 2;
console.log(middle);
var isdecendig = false;

for (var _i = 0, _ar = ar; _i < _ar.length; _i++) {
  var r = _ar[_i];

  if (counts > middle) {
    isdecendig = true;
  } else {
    isdecendig = false;
  }

  if (isdecendig) {
    counts -= 1;
  } else {
    counts += 1;
  }

  newarr = sing.repeat(r);
  console.log(newarr);
  console.log(counts);
}

console.log(ar.length);