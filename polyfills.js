// Array.prototype.myFilter = function (callback, thisArg) {
//   if (this === null || this === undefined) {
//     throw new TypeError("Array.prototype.filter called on null or undefined");
//   }

//   if (typeof callback !== "function") {
//     throw new TypeError(callback + " is not a function");
//   }

//   const filteredArray = [];
//   const len = this.length;

//   for (let i = 0; i < len; i++) {
//     if (callback.call(thisArg, this[i], i, this)) {
//       filteredArray.push(this[i]);
//     }
//   }

//   return filteredArray;
// };
// const isEven = (num, index, arr) => {
//   return num % 2 === 0;
// };

// const arr1 = [1, 2, 3, 4, 5, 6, 6, 6, 9];

// const onlyEvenElements = arr1.myFilter(isEven); // [2, 4, 6, 6, 6]
// // console.log("even filter", onlyEvenElements);

// const add = (acc, curr) => {
//   return acc + curr;
// };

// Array.prototype.myReduce = function (callback, initialValue) {
//   if (this === null || this === undefined) {
//     throw new TypeError("Array.prototype.reduce called on null or undefined");
//   }

//   if (typeof callback !== "function") {
//     throw new TypeError(callback + " is not a function");
//   }

//   const len = this.length;
//   let accumulator = initialValue !== undefined ? initialValue : this[0];
//   let startIndex = initialValue !== undefined ? 0 : 1;

//   for (let i = startIndex; i < len; i++) {
//     if (this.hasOwnProperty(i)) {
//       accumulator = callback.call(undefined, accumulator, this[i], i, this);
//     }
//   }

//   return accumulator;
// };

// const arr2 = [1, 2, 3, 4, 5];
// const acc = arr2.myReduce(add, 0);
// // console.log("sum myReduce", acc);

// Array.prototype.myMap = function (callback, thisArg) {
//   if (this === null || this === undefined) {
//     throw new TypeError("Array.prototype.map called on null or undefined");
//   }

//   if (typeof callback !== "function") {
//     throw new TypeError(callback + " is not a function");
//   }

//   const mappedArray = [];
//   const len = this.length;

//   for (let i = 0; i < len; i++) {
//     if (this.hasOwnProperty(i)) {
//       mappedArray[i] = callback.call(thisArg, this[i], i, this);
//     }
//   }

//   return mappedArray;
// };

// const numbers = [1, 2, 3, 4, 5];

// const squaredNumbers = numbers.myMap((num) => num * num);
// // console.log("square map", squaredNumbers); // Output: [1, 4, 9, 16, 25]
// const arr = [1, 2, 3];
// arr[5] = 6; // Adding an element at index 5, leaving indices 3 and 4 undefined  without hasOwnProperty

// const result = arr.myMap((element, index) => element); // [0, 1, 2, undefined, undefined, 5]
// // console.log(result);

// Promise.prototype.myAll = function (promises) {
//   return new Promise((resolve, reject) => {
//     if (!Array.isArray(promises)) {
//       reject(new TypeError("arguments must be an array"));
//     }

//     const results = [];
//     let completed = 0;

//     promises.forEach((promise, index) => {
//       Promise.resolve(promise)
//         .then((result) => {
//           results[index] = result;
//           completed++;

//           if (completed === promises.length) {
//             resolve(results);
//           }
//         })
//         .catch(reject);
//     });

//     if (promises.length === 0) {
//       resolve(results);
//     }
//   });
// };

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, "foo");
// });

// Promise.prototype
//   .myAll([promise1, promise2, promise3])
//   .then((values) => {
//     // console.log(values); // Output: [3, 42, 'foo']
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// function addNumbers(a, b) {
//   if (typeof a !== "number" || typeof b !== "number") {
//     throw new TypeError("Both arguments must be numbers");
//   }
//   return a + b;
// }

// // Calling the function with a string as one argument
// // const results = addNumbers(5, "6");
// // console.log(results);
// Function.prototype.myBind = function (context) {
//   const fn = this;
//   const args = Array.prototype.slice.call(arguments, 1);

//   return function () {
//     const newArgs = args.concat(Array.prototype.slice.call(arguments));
//     return fn.apply(context, newArgs);
//   };
// };
// const person = {
//   firstName: "John",
//   lastName: "Doe",
// };

// function greet(greeting) {
//   return `${greeting}, ${this.firstName} ${this.lastName}!`;
// }

// const greetPerson = greet.bind(person, "Hello");
// console.log(greetPerson()); // Output: Hello, John Doe!
// console.log(Object.prototype.toString.call(this));

function PromisePolyFill(executor) {
  let onResolve,
    onReject,
    fulfilled = false,
    rejected = false,
    called = false,
    value;

  this.resolve = function (v) {
    fulfilled = true;
    value = v;

    if (typeof onResolve === "function") {
      // for async
      console.log("inside resolve");
      onResolve(value);
      called = true;
    }
  };

  this.reject = function (reason) {
    rejected = true;
    value = reason;

    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  };

  this.then = function (callback) {
    onResolve = callback;
    console.log("inside then1");

    if (fulfilled && !called) {
      // for sync
      console.log("inside then2");

      called = true;
      onResolve(value);
    }

    console.log("inside then3");

    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(this.resolve, this.reject);
  } catch (error) {
    reject(error);
  }
}

// const promise4 = new PromisePolyFill((resolve, reject) => {
//   console.log(1);
//   // setTimeout(() => {
//   resolve(2);
//   // }, 1000);
//   console.log(3);
// });

// promise4.then((res) => {
//   console.log(res);
// });

Function.prototype.customCall = function (context, ...args) {
  context = context || {};
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// Example usage:
function greet(name) {
  return `Hello, ${name}!`;
}

const result = greet.customCall(null, "John");
// console.log(result); // Output: Hello, John!
Function.prototype.customApply = function (context, argsArray) {
  context = context || {};
  context.fn = this;
  // console.log("context", context, this);
  const result = context.fn(...argsArray);
  delete context.fn;
  return result;
};

// Example usage:
function sum(a, b) {
  return a + b;
}

const numbers = [5, 10];
const total = sum.customApply(null, numbers);
// console.log(total); // Output: 15
function findAllPaths(obj, target, currentPath = []) {
  const paths = [];
  for (let key in obj) {
    if (obj[key] === target) {
      paths.push([...currentPath, key]); // Found the target value, add the path to the array
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const nestedPaths = findAllPaths(obj[key], target, [...currentPath, key]); // Recursively search in nested object
      paths.push(...nestedPaths); // Add all paths found in the nested object to the array
    }
  }
  return paths;
}

// Example object
const nestedObject = {
  a: {
    b: {
      c: 10,
      d: {
        e: "target",
      },
    },
    f: [1, 2, { g: "target" }],
  },
  h: "anotherValue",
};

// const allPaths = findAllPaths(nestedObject, "target");
// console.log("All Paths:", allPaths);
function sum(x) {
  let total = x;

  function innerSum(y) {
    total += y || 0;
    return innerSum;
  }

  innerSum.valueOf = function () {
    return total;
  };

  return innerSum;
}

const result3 = +sum(1)(2)(4);
// console.log(result3); // Output: 7
var debounce = function (fn, t) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(fn, t, ...args);
  };
};
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
