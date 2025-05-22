// window.addEventListener('scroll', () => {
//   const thingsteerText = document.getElementById('thingsteer-text');
//   const stickyHeader = document.querySelector('.sticky-header');
//   const audio = document.getElementById('ambient-audio');
//   const videoSection = document.getElementById('videoSection');

//   const scrollPosition = window.scrollY;

//   // Fade THINGSTEER & make header sticky
//   if (scrollPosition > 100) {
//     thingsteerText.style.opacity = 0;
//     stickyHeader.classList.add('active');
//     videoSection.classList.add('show');  // 👉 Reveal the video
//   } else {
//     thingsteerText.style.opacity = 1;
//     stickyHeader.classList.remove('active');
//     videoSection.classList.remove('show');
//   }

//   if (scrollPosition > 10 && audio.paused) {
//     audio.play().catch(e => console.log('Audio play blocked by browser:', e));
//   }
// });


// function toggleChat() {
//   const chat = document.getElementById("chatWindow");
//   chat.style.display = chat.style.display === "flex" ? "none" : "flex";
// }

// function handleKey(event) {
//   if (event.key === "Enter") {
//     sendMessage();
//   }
// }

// function sendMessage() {
//   const input = document.getElementById("userInput");
//   const msg = input.value.trim();
//   if (!msg) return;

//   const chatBody = document.getElementById("chatBody");

//   const userMsg = document.createElement("div");
//   userMsg.className = "user-msg";
//   userMsg.innerText = msg;
//   chatBody.appendChild(userMsg);

//   const botMsg = document.createElement("div");
//   botMsg.className = "bot-msg";
//   botMsg.innerText = getBotResponse(msg);
//   chatBody.appendChild(botMsg);

//   input.value = "";
//   chatBody.scrollTop = chatBody.scrollHeight;
// }

// async function getBotResponse(userText) {
//   try {
//     const res = await fetch("http://127.0.0.1:5000/get_prediction", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ message: userText })
//     });

//     const data = await res.json();
//     return data.response || "Sorry, I didn't understand that.";
//   } catch (error) {
//     console.error("Error contacting LLM:", error);
//     return "Sorry, the assistant is currently offline.";
//   }
// }

// async function handleUserMessage() {
//   const userText = document.getElementById('userInput').value;
//   const botResponse = await getBotResponse(userText);
//   document.getElementById('result').innerText = botResponse;
// }

// document.getElementById('submitButton').addEventListener('click', handleUserMessage);


window.addEventListener('scroll', () => {
  const thingsteerText = document.getElementById('thingsteer-text');
  const stickyHeader = document.querySelector('.sticky-header');
  const audio = document.getElementById('ambient-audio');
  const videoSection = document.getElementById('videoSection');

  const scrollPosition = window.scrollY;

  // Fade THINGSTEER & make header sticky
  if (scrollPosition > 100) {
    thingsteerText.style.opacity = 0;
    stickyHeader.classList.add('active');
    videoSection.classList.add('show');  // 👉 Reveal the video
  } else {
    thingsteerText.style.opacity = 1;
    stickyHeader.classList.remove('active');
    videoSection.classList.remove('show');
  }

  // Play audio if scrolled more than 10px
  if (scrollPosition > 10 && audio.paused) {
    audio.play().catch(e => console.log('Audio play blocked by browser:', e));
  }
});

// Toggle chat window visibility
function toggleChat() {
  const chat = document.getElementById("chatWindow");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

// Handle 'Enter' key press to send message
function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Send user message and fetch bot response
async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chatBody = document.getElementById("chatBody");

  // Create user message element
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = msg;
  chatBody.appendChild(userMsg);

  // Get the bot response asynchronously
  const botResponse = await getBotResponse(msg);

  // Create bot message element
  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = botResponse;
  chatBody.appendChild(botMsg);

  // Scroll to the bottom of the chat window
  chatBody.scrollTop = chatBody.scrollHeight;

  // Clear the input field
  input.value = "";
}

// Fetch bot response from the backend
async function getBotResponse(userText) {
  try {
    const res = await fetch("http://127.0.0.1:5000/get_prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_input: userText })
    });

    const data = await res.json();
    return data.optimized_response || data.original_response || "Sorry, I didn't understand that.";
  } catch (error) {
    console.error("Error contacting LLM:", error);
    return "Sorry, the assistant is currently offline.";
  }
}



// Handle user message submission by clicking the button
document.getElementById('submitButton').addEventListener('click', sendMessage);

// Show cards based on the selected category
function showCards(category) {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = ''; // Clear existing cards

  const cardsData = {
    // team: ['<img src="assets/team.png" alt="Team Image" style="width:100%; height:auto;">'],
    clients: ['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 3'],
    achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3', 'Achievement 4']
  };

  const selectedCards = cardsData[category] || [];

  selectedCards.forEach((text) => {
    const card = document.createElement('div');
    card.className = 'book';
    card.innerHTML = `
      <p>${text}</p>
      <div class="cover">
        <p>Hover Me</p>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

function showTeamImage() {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = ''; // Clear existing cards
  const container = document.getElementById('team-image-container');
  if (container.style.display === 'none' || container.style.maxHeight === '0px') {
    container.style.display = 'block';
    container.style.maxHeight = container.scrollHeight + 'px';
  } else {
    container.style.maxHeight = '0px';
    setTimeout(() => {
      container.style.display = 'none';
    }, 500); // Match the transition duration
  }
}
