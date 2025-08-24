const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { riddle_id, wallet_address, answer_text, submitted_at, hint_unlocked } = req.body;

    const { data, error } = await supabase
      .from("answers")
      .insert([{ riddle_id, wallet_address, answer_text, submitted_at, hint_unlocked }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to store answer" });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected server error" });
  }
};
