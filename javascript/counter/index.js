const decrement = document.getElementById("decrement");
const changeBy = document.getElementById("changeBy");
const reset = document.getElementById("reset");
const value = document.querySelector(".value");

function incrementfn() {
  value.textContent = +value.textContent + changeBy.valueAsNumber;
}

decrement.addEventListener("click", () => {
  value.textContent = +value.textContent - changeBy.valueAsNumber;
});

changeBy.addEventListener("change", () => {
  const changeByValue = changeBy.valueAsNumber;

  if (Number.isNaN(changeByValue)) {
    changeBy.valueAsNumber = 1;
  }
});

reset.addEventListener("click", () => {
  value.textContent = 0;
});
