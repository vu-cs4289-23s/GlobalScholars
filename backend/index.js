// Import libraries
import path from "path";
import fs from "fs";
import http from "http";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import session from "express-session";
import envConfig from "simple-env-config";
import pug from "pug";
import url from "url";
import cors from "cors";
import dummyjson from "dummy-json";

// Import mongoose
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

// Import models
import Post from "./models/post.js";
import Program from "./models/program.js";
import User from "./models/user.js";
import Location from "./models/location.js";
import Comment from "./models/comment.js";
import PriceEstimate from "./models/price_estimate.js";

// Import routes
import Routes from "./api/index.js";

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const setupServer = async () => {
  // Get the app config
  const conf = await envConfig("../config.json", env);
  const port = process.env.PORT ? process.env.PORT : conf.port;

  // Setup our Express pipeline
  let app = express();
  app.use(cors());

  app.use(logger("dev"));
  app.engine("pug", pug.__express);
  app.set("views", __dirname);
  app.use(express.static(path.join(__dirname, "../../public")));
  // Setup pipeline session support
  app.store = session({
    name: "session",
    secret: "globallyscholaredsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
    },
  });
  app.use(app.store);
  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  try {
    // Connect to MongoDB
    mongoose.set("strictQuery", false);
    await mongoose.connect(conf.mongodb);
    mongoose.connection.on("disconnected", () => {
      console.log(`MongoDB shutting down`);
    });
    console.log(`MongoDB connected: ${conf.mongodb}`);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }

  // Import our Data Models
  app.models = {
    Post: Post,
    Program: Program,
    User: User,
    Location: Location,
    Comment: Comment,
    PriceEstimate: PriceEstimate,
  };

  // Call routes
  Routes(app);

  app.get("/api/v1/generateDummyPosts/:number", function (req, res) {
    const numberOfTimes = req.params.number;
    const myPartials = {
      post: `{
        "owner": "{{random "${new mongoose.Types.ObjectId()}" "${new mongoose.Types.ObjectId()}" "${new mongoose.Types.ObjectId()}"}}",
        "timestamp": "{{date '2015-01-01' '2015-12-31' 'YYYY-MM-DD'}}",
        "content": "{{random 'It was alright' 'Wow so good' 'It could use some work' 'I had a great time' 'I had a terrible time' 'I would recommend it' 'I would not recommend it' 'I would go back'}}",
        "tags": [
          {{#repeat 3}}
          "{{random "Travel" "Language" "Reviews" "Academic" "Culture" "Other" "Sights" "Housing" "Social" "Cost" "Foods" "Weather" "Location" "Safety"}}"
          {{/repeat}}
        ],
        "likes": {{int 0 100}},
        "dislikes": {{int 0 100}},
        "saves": {{int 0 100}},
        "location": "{{city}}",
        "program": "{{company}}"
      }`,
    };
    const template = `{
      "posts": [
        {{#repeat ${numberOfTimes}}}
        {{> post}}
        {{/repeat}}
      ]
    }`;

    const result = dummyjson.parse(template, { partials: myPartials });

    //convert json string to json object

    res.set("Content-Type", "application/json");
    res.status(200).send(result);
  });

  // Give them the SPA base page
  app.get("*", (req, res) => {
    const user = req.session.user;
    // TODO: edit the below user session information
    console.log(`Loading app for: ${user ? user.username : "nobody!"}`);
    let preloadedState = user
      ? {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          primary_email: user.primary_email,
          program: user.program,
          location: user.location,
        }
      : {};
    preloadedState = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
    res.render("base.pug", {
      state: preloadedState,
    });
  });

  // Run the server itself
  let server;
  if (env === "production") {
    const options = {
      key: fs.readFileSync(conf.security.keyPath),
      cert: fs.readFileSync(conf.security.certPath),
      ca: fs.readFileSync(conf.security.caPath),
    };
    // Listen for HTTPS requests
    server = https.createServer(options, app).listen(port, () => {
      console.log(
        `Secure GlobalScholar server listening on: ${server.address().port}`
      );
    });
    // Redirect HTTP to HTTPS
    http
      .createServer((req, res) => {
        const location = `https://${req.headers.host}${req.url}`;
        console.log(`Redirect to: ${location}`);
        res.writeHead(302, { Location: location });
        res.end();
      })
      .listen(80, () => {
        console.log(`GlobalScholar server listening on 80 for HTTPS redirect`);
      });
  } else {
    server = app.listen(port, () => {
      console.log(
        `GlobalScholar server ${env} listening on: ${server.address().port}`
      );
    });
  }
};

// Run the server
setupServer();
