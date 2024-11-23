// Function to show a toast notification
function showToast(type, message, duration) {
  const toastContainer = document.getElementById("toast-container");

  // Create toast element
  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  // Add message to toast
  toast.innerHTML = `
      <span>${message}</span>
      <button class="close-btn" onclick="removeToast(this)">×</button>
    `;

  // Append toast to container
  toastContainer.appendChild(toast);

  // Auto-remove toast after specified duration
  if (duration) {
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  }
}

// Function to remove a toast
function removeToast(buttonElement) {
  // Get the parent toast element (buttonElement is the button clicked)
  const toast = buttonElement.closest(".toast");

  if (toast) {
    toast.remove();
  }
}
