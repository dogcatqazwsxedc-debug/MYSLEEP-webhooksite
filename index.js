const express = require("express");
const app = express();

app.use(express.json());

const VERIFY_TOKEN = "mysleep_verify_token";

/* Root route — optional, just to confirm server is running */
app.get("/", (req, res) => {
  res.send("Webhook server is running!");
});

/* Webhook verification (required by WhatsApp) */
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

/* Receive WhatsApp messages */
app.post("/webhook", (req, res) => {
  console.log("Incoming message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
