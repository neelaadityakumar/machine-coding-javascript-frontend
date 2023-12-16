let selectedChatId = null;
let selectedId = null;
let chatMessages = {};

function filterChats(value) {
  const chatList = document.getElementById("chatList");
  const chatItems = chatList.getElementsByClassName("chat-item");

  for (const chatItem of chatItems) {
    const title = chatItem.querySelector("h3").textContent.toLowerCase();
    const orderId = chatItem
      .querySelector("p:nth-of-type(1)")
      .textContent.toLowerCase();

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

function highlightChat(chatId) {
  const chatItems = document.querySelectorAll(".chat-item");

  chatItems.forEach((chatItem) => {
    chatItem.classList.remove("selected");
    if (chatItem.id == chatId.toString()) {
      chatItem.classList.add("selected");
      selectedId = chatId;
    }
  });
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

function populateChatList(chats) {
  const chatList = document.getElementById("chatList");
  chatList.innerHTML = "";

  chats.forEach((chat) => {
    const chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");
    chatItem.id = chat.id;
    chatItem.innerHTML = `
        <img src="${chat.imageURL}" alt="Chat Image" id="product-image">
        <div>
        <div id="titleContainer"><h3>${
          chat.title
        }</h3>          <p>${formatDate(chat.latestMessageTimestamp)}</p>

        </div>
          <p>Order ID: ${chat.orderId}</p>
          <p>${getLastMessage(chat)}</p>
        </div>
      `;
    chatItem.addEventListener("click", () => {
      displayChatMessages(chat.id);

      highlightChat(chat.id);
    });
    chatList.appendChild(chatItem);
  });
}
function getLastMessage(chat) {
  const lastMessage =
    chat.messageList && chat.messageList.length > 0
      ? chat.messageList[chat.messageList.length - 1].message
      : "";

  return lastMessage;
}

function showChatWindow() {
  const chatwindow = document.querySelector(".chat-window");
  chatwindow.style.width = "60%";
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.width = "40%";
}
function displayChatMessages(chatId) {
  if (!selectedId) {
    showChatWindow();
  }
  const messagesContainer = document.getElementById("chatMessages");
  messagesContainer.innerHTML = "";

  const messages = chatMessages[chatId] || [];

  messages.forEach((message) => {
    const messageItem = document.createElement("div");
    messageItem.classList.add("message");

    if (message.messageType === "text") {
      const isSentByUser = message.sender === "USER";

      if (isSentByUser) {
        messageItem.classList.add("sent-message");
      } else {
        messageItem.classList.add("received-message");
      }

      messageItem.textContent = message.message;
    } else if (message.messageType === "optionedMessage") {
      const card = document.createElement("div");
      card.classList.add("optioned-message");

      const messageContent = document.createElement("p");
      messageContent.textContent = message.message;
      card.appendChild(messageContent);

      const optionsButton = document.createElement("button");
      optionsButton.textContent = "Options";
      optionsButton.addEventListener("click", () => {
        const userReply = message.message;
        sendMessage(chatId, userReply);
      });

      card.appendChild(optionsButton);
      messageItem.appendChild(card);
    }

    messagesContainer.appendChild(messageItem);
  });
}
function updateChatMessages(chatId, message) {
  if (!chatMessages[chatId]) {
    chatMessages[chatId] = [];
  }
  chatMessages[chatId].push(message);
  displayChatMessages(chatId);
}

function sendMessage(chatId, message) {
  console.log("selectedChat", chatId, message);

  const newMessage = {
    messageId: "msg" + (chatMessages[chatId].length + 1),
    message,
    timestamp: Date.now(),
    sender: "USER",
    messageType: "text",
  };

  updateChatMessages(chatId, newMessage);
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

async function initializeChatPage() {
  const data = await fetchData();
  populateChatList(data);
  data.forEach((chat) => {
    chatMessages[chat.id] = chat.messageList || [];
  });
}

initializeChatPage();
const filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", () => filterChats(filterInput.value));
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", () => {
  const selectedChat = document.getElementById(selectedId);

  if (selectedChat) {
    const chatId = selectedChat.id;
    const message = messageInput.value.trim();

    if (message !== "") {
      sendMessage(chatId, message);
    }

    messageInput.value = "";
  } else {
    console.error("No chat selected");
  }
});
