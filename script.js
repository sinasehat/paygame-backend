document.addEventListener("DOMContentLoaded", 
function () {
  const form = document.getElementById("answerForm");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const answer = document.getElementById("answer").value.trim();
    const wallet = "0xSINATEST"; // Replace with actual wallet logic if needed

    const payload = {
      riddle_id: "311797d1-8e06-4232-8e71-6d979f994aec", // Replace with actual riddle ID
      wallet_address: wallet,
      answer_text: answer,
      submitted_at: new Date().toISOString(),
      hint_unlocked: false
    };

    fetch("https://your-vercel-project.vercel.app/api/submit-answer", {
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
});
//inam bara khidam ke check knm