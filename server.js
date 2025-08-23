const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient("https://voxuninnzzbgpjljhlyz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZveHVuaW5uenpiZ3BqbGpobHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTI0NDcsImV4cCI6MjA3MTQ2ODQ0N30.9BlMXYJWkrX0NesUhfmVgA3ZykBOTaaUtYgNJoQgl5c");

app.post("/submit-answer", async (req, res) => {
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});