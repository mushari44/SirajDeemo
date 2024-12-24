document.getElementById("send-button").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  document.getElementById("send-button").value = "";
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");

  // Display user message
  const userMessage = document.createElement("div");
  userMessage.textContent = `${userInput}`;
  userMessage.classList.add("user-message");
  chatBox.appendChild(userMessage);

  // Display bot message with loader
  const botMessage = document.createElement("div");
  botMessage.classList.add("bot-message");
  const loader = document.createElement("div");
  const text = document.createElement("div");
  text.className = "text";
  loader.className = "loader";
  loader.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>

    `;
  botMessage.appendChild(loader);
  chatBox.appendChild(botMessage);

  // Auto-scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // Send query to backend
    const response = await fetch("http://127.0.0.1:8000/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userInput }),
    });
    const data = await response.json();

    // Remove loader and add bot response
    loader.remove(); // Remove the loader
    text.innerText = `${data.response}`;
    botMessage.appendChild(text);
  } catch (error) {
    console.error("Error:", error);
    loader.remove(); // Remove the loader
    botMessage.textContent = "Bot: Sorry, something went wrong!";
  }

  // Auto-scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear user input
  document.getElementById("user-input").value = "";
});
