import express from "express";
import expressWs from "express-ws";

import path from "node:path";
import url from "node:url";

import client from "./src/receiver.js";
 
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const { app } = expressWs(express());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use(express.static('public'));

app.ws("/connect", (ws, req) => {
  console.log("Websocket Established");

  const handler = message => {
    if (message.channelId === req.query.channelId) ws.send(message.content);
  }

  client.on("messageCreate", handler);

  console.log(`Start waiting for new message: ${req.query.channelId}`);

  ws.on("close", () => {
    console.log("Stop wating for message");
    client.removeListener("messageCreate", handler);
  });

  ws.on("error", e => {
    console.log(e);
  });
});

app.listen(3000, () => console.log('http://localhost:3000'));