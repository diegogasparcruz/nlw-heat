import "dotenv/config";
import express from "express";
import { router } from "./routes";

const app = express();

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

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
