const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// ✅ Health check route

// ✅ Submission route
app.post("/submit-answer", async (req, res) => {
  console.log("Received answer submission:");
  console.log(req.body);

  const { riddle_id, wallet_address, answer_text, submitted_at, hint_unlocked } = req.body;

  const { data, error } = await supabase
    .from("answers")
    .insert([{ riddle_id, wallet_address, answer_text, submitted_at, hint_unlocked }]);

  if (error) {
    console.error("Insert error:", error);
    return res.status(500).json({ error: "Failed to store answer" });
  }

  res.json({ success: true, data });
});

// ✅ Vercel uses process.env.PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});