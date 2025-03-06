import express from "express";

import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  try {
    await client.lPush(
        "submissions",
        JSON.stringify({ problemId, userId, code, language })
      );
    
      res.json({
        message: "Data submitted successfully",
      });
  } catch (error) {
    res.json({
        message: "Submission failed",
      });
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000")  });