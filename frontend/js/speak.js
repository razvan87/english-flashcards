export function addSpeakButtonListener(button, text) {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent flipping card when clicking speaker
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB"; // or "en-US"
      utterance.rate = 0.9; // slower = easier for learners
      utterance.pitch = 1;
      
      window.speechSynthesis.speak(utterance);
    });
  }