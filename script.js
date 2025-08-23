document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("answerForm");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const answer = document.getElementById("answer").value.trim();
    const wallet = "0xUSERWALLET"; // Placeholder

    const payload = {
      riddle_id: "YOUR_RIDDLE_UUID",
      wallet_address: wallet,
      answer_text: answer,
      submitted_at: new Date().toISOString(),
      hint_unlocked: false
    };

    fetch("http://localhost:3000/submit-answer", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => {
  console.log("Server response:", data);
  alert("Answer submitted successfully!");
})
.catch(err => {
  console.error("Submission error:", err);
  alert("Failed to submit answer.");
});
    
});