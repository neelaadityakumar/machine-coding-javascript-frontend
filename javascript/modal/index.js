let btn = document.getElementById("btn");
let modal = document.getElementById("modal");
let overlay = document.getElementById("overlay");
let modalContainer = document.querySelector(".modal-container");

// Open Modal
btn.addEventListener("click", function (e) {
  modal.style.display = "block";
});

// Close modal when clicking the close button
document.getElementById("close").addEventListener("click", function (e) {
  modal.style.display = "none";
});

// Close modal when clicking **outside modal content**
overlay.addEventListener("click", function (e) {
  if (!modalContainer.contains(e.target)) {
    modal.style.display = "none";
  }
});
