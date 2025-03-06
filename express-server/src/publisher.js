// publisher.js
import { createClient } from "redis";

async function publishMessage() {
  const client = createClient();
  await client.connect();

  // Publish a message every 2 seconds
  setInterval(() => {
    const message = `Message at ${new Date().toISOString()}`;
    client.publish("notifications", message);
    console.log("Published:", message);
  }, 2000);
}

publishMessage().catch(console.error);