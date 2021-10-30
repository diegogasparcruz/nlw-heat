import "dotenv/config";

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { router } from "./routes";

const app = express();

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (sockect) => {
  console.log(`Usuário conectado no socket ${sockect.id}`);
});

app.use(express.json());

app.use(router);

app.get("/github", (request, respose) => {
  respose.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request, respose) => {
  const { code } = request.query;

  return respose.json(code);
});

export { serverHttp, io };
