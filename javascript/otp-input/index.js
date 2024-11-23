const display = document.getElementById("display");
const otpLength = 6;
const otpFields = [];

// Create input fields for OTP
const populateDisplay = (length) => {
  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.maxLength = 1;
    input.classList.add("slot");
    display.appendChild(input);
    otpFields.push(input);
  }
};

// Check if value is a digit
const isDigit = (value) => /^\d+$/.test(value);

// Handle keydown events for navigation and input
display.addEventListener("keydown", (e) => {
  const target = e.target;

  if (isDigit(e.key)) {
    target.value = ""; // Clear input on digit key press
    return;
  }

  // Navigate with arrow keys
  if (e.key === "ArrowLeft") {
    target.previousElementSibling?.focus();
    e.preventDefault();
  } else if (e.key === "ArrowRight") {
    target.nextElementSibling?.focus();
  }
});

// Handle keyup events for Backspace and Delete
display.addEventListener("keyup", (e) => {
  const target = e.target;

  if (["Backspace", "Delete"].includes(e.key)) {
    target.value = ""; // Clear input
    target.previousElementSibling?.focus(); // Move focus
  }
});

// Handle input events for digit validation
display.addEventListener("input", (e) => {
  const target = e.target;

  if (!isDigit(target.value)) {
    target.value = ""; // Clear non-digit input
    return;
  }

  // Move to the next input field or blur if filled
  const next = target.nextElementSibling;
  if (next) {
    next.focus();
  } else if (target.parentElement.firstChild.value === "") {
    target.parentElement.firstChild.focus();
  } else {
    target.blur();
  }
});

// Handle paste events for filling OTP fields
display.addEventListener("paste", (e) => {
  const pastedData = (e.clipboardData || window.clipboardData).getData("Text");

  if (pastedData.length === otpLength && isDigit(pastedData)) {
    otpFields.forEach((field, i) => {
      field.value = pastedData.charAt(i); // Fill input fields with pasted data
    });
  }
});

// Initialize OTP display
populateDisplay(otpLength);
