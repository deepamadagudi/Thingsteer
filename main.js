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
    clients: [
      { text: 'Mindmill supports organisations in recruiting, developing, and retaining top talent. By streamlining and automating traditionally admin-heavy processes, we reduce costs and improve operational efficiency.....', 
        image: 'assets/mindmill.png',
      projects:[{name:'Careermaps'},{name:'Testbulider'}]
    },
      { text: 'Client 2', 
        image: 'assets/Centria.png',
        projects:[{name:'Autism'},{name:' Automation - AI'}] },
      { text: 'Client 3', 
        image: 'assets/eTrack.png',
        projects:[{name:'eTrack-Client'},{name:'etrack-SFM'}] },
      { text: 'Client 4', 
        image: 'assets/Motorola.png', 
        projects:[{name:'NGCAT'},{name:'UGW'},{name:'OnePortal'}] },
      { text: 'Client 5', 
        image: 'assets/amfa1.jpg',
        projects:[{name:'AMFA'}] },
      { text: 'Client 6', 
        image: 'assets/capillary.png', 
         projects:[{name:'LMS'}] }
    ]
   
  };

  const selectedCards = cardsData[category] || [];

  selectedCards.forEach(({ text, image, hoverText, projects }) => {
    const card = document.createElement('div');
    card.className = 'book';
    card.innerHTML = `
      <div id="info">
        <div id="projects" class="projects"></div>
      </div>
      <div class="cover" style="padding:26px; background-size: cover; background-position: center;">
        <div>
          <img src='${image}' alt='Image description' class="responsive-image">
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  
    const projectsContainer = card.querySelector('#projects');
    projects.forEach(project => {
      const projectButton = document.createElement('button');
      projectButton.className = 'btn btn-primary cardbuttons';
      projectButton.textContent = project.name; // Set the button text to the project name
      projectButton.onclick = () => showTeamImage(); // Add the click event
      projectsContainer.appendChild(projectButton);
    });
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
function Achivement() {
  const achievements = [
    // "Achievement 1: Successfully launched the product.",
    "🏆<b>Motorolasolutions</b>:Successful Completion of IOT Security Policy Update Activity",
    "🏆<b>Mindmill</b>:Early handover",
    "🏆<b>eTrack</b>:creation of the new eTrack SOM environments.",
    // "Achievement 4: Expanded to 10 countries."
  ];

  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = `
    <div class="achivement">
      ${achievements.map(item => `
        <div class="achivement-list" style="display: flex; align-items: center; gap: 8px;">
        
          <span>${item}</span>
        </div>
      `).join('')}
    </div>
  `;
}

window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video[autoplay]').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }

    }
  }

}