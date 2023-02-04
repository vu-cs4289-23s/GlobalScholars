import express from "express";
import Api from "./api/index.js";

const SetUpServer = () => {
  const app = express();
  const port = 8080;

  Api(app);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
SetUpServer();
