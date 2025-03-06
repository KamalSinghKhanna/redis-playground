// subscriber.js
import { createClient } from "redis";

async function subscribeToMessages() {
  const client = createClient();
  await client.connect();

  // Subscribe to the "notifications" channel
  client.subscribe("notifications", (message) => {
    console.log("Received message:", message);
  });

  client.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });
}

subscribeToMessages().catch(console.error);