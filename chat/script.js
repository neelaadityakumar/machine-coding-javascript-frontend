let selectedChatId = null;

// Function to filter chat list by Chat Title / Order ID
// Function to filter chat list by Chat Title / Order ID
function filterChats(value) {
  const chatList = document.getElementById("chatList");
  const chatItems = chatList.getElementsByClassName("chat-item");

  for (const chatItem of chatItems) {
    const title = chatItem.querySelector("h3").textContent.toLowerCase();
    const orderId = chatItem
      .querySelector("p:nth-of-type(1)")
      .textContent.toLowerCase();

    console.log("checking", orderId, orderId.includes(value.toLowerCase()));
    if (
      title.includes(value.toLowerCase()) ||
      orderId.includes(value.toLowerCase())
    ) {
      chatItem.style.display = "block";
    } else {
      chatItem.style.display = "none";
    }
  }
}

// Function to highlight selected chat
function highlightChat(chatId) {
  const chatList = document.getElementById("chatList");
  const chatItems = chatList.getElementsByClassName("chat-item");

  for (const chatItem of chatItems) {
    chatItem.classList.remove("selected");
  }

  const selectedChat = document.getElementById(`chat-${chatId}`);
  selectedChat.classList.add("selected");
}
async function fetchData() {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/codebuds-fk/chat/chats"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Populate chat list
function populateChatList(chats) {
  const chatList = document.getElementById("chatList");
  chatList.innerHTML = "";

  chats.forEach((chat) => {
    const chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");
    chatItem.innerHTML = `
        <img src="${chat.imageURL}" alt="Chat Image">
        <div>
          <h3>${chat.title}</h3>
          <p>Order ID: ${chat.orderId}</p>
          <p>Last Message Date: ${formatDate(chat.latestMessageTimestamp)}</p>
        </div>
      `;
    chatItem.addEventListener("click", () => displayChatMessages(chat));
    chatList.appendChild(chatItem);
  });
}

// Display messages for selected chat
function displayChatMessages(chat) {
  selectedChatId = chat.id; // Update selected chat ID
  highlightChat(selectedChatId); // Highlight selected chat
  const messages = document.getElementById("messages");
  messages.innerHTML = "";

  if (chat.messageList.length === 0) {
    const noMessages = document.createElement("div");
    noMessages.classList.add("no-messages");
    noMessages.textContent = "Send a message to start chatting";
    messages.appendChild(noMessages);
    return;
  }

  chat.messageList.forEach((message) => {
    const messageItem = document.createElement("div");
    messageItem.classList.add("message");
    messageItem.classList.add(message.sender.toLowerCase()); // Adds sender class for alignment
    messageItem.textContent = message.message;
    messages.appendChild(messageItem);
  });
}

// Function to send a message (simulated functionality)
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  // Logic to send the message (will be implemented based on the backend)
  // Clear input field after sending
  messageInput.value = "";
  // Code to append the user message to the chat
}

// Format date in DD/MM/YYYY format
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// Initialize chat page
async function initializeChatPage() {
  const data = await fetchData();
  populateChatList(data);
}

initializeChatPage();
const filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", () => filterChats(filterInput.value));
