import express from "express";
import compression from "compression";
import Api from "./api/index.js";

const SetUpServer = () => {
  const app = express();
  const port = 8080;
  app.use(compression());
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  Api(app);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
SetUpServer();
