const outer = document.getElementById("outer");
const middle = document.getElementById("middle");
const inner = document.getElementById("inner");

// Adding event listeners for click events with capturing and bubbling phases
outer.addEventListener("click", function () {
  console.log("Capturing phase: Outer");
}); // Setting the useCapture parameter to true for capturing phase

middle.addEventListener("click", function () {
  console.log("Bubbling phase: Middle");
});

inner.addEventListener("click", function () {
  console.log("Target phase: Inner");
});

outer.addEventListener(
  "click",
  function () {
    console.log("Capturing phase: Outer true");
  },
  true
); // Setting the useCapture parameter to true for capturing phase

middle.addEventListener(
  "click",
  function () {
    console.log("Bubbling phase: Middle true");
  },
  true
);

inner.addEventListener(
  "click",
  function () {
    console.log("Target phase: Inner true");
  },
  true
);
