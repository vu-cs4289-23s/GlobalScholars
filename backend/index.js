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

// Import mongoose
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');

// Import models
import Post from "./models/post.js";
import Program from "./models/program.js";
import User from "./models/user.js";
import Location from "./models/location.js";
import Comment from "./models/comment.js";

// Import routes
import Routes from "./api/index.js";

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const setupServer = async () => {
  // Get the app config
  const conf = await envConfig("../config.json", env);
  const port = process.env.PORT ? process.env.PORT : conf.port;

  // Setup our Express pipeline
  let app = express();
  app.use(logger("dev"));
  app.engine("pug", pug.__express);
  app.set("views", __dirname);
  app.use(express.static(path.join(__dirname, "../../public")));
  // Setup pipeline session support
  app.store = session({
    name: "session",
    secret: "grahamcardrules",  //change
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
  };

  // Call routes
  Routes(app);

  // Give them the SPA base page
  app.get("*", (req, res) => {
    const user = req.session.user;
    console.log(`Loading app for: ${user ? user.username : "nobody!"}`);

    // console.log(`Loading app for: ${user ? user.username : "nobody!"}`);
    // let preloadedState = user
    //   ? {
    //     username: user.username,
    //     first_name: user.first_name,
    //     last_name: user.last_name,
    //     primary_email: user.primary_email,
    //     program: user.program,
    //     location: user.location,
    //   }
    //   : {};
    // preloadedState = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
    // res.render("base.pug", {
    //   state: preloadedState,
    // });
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
      console.log(`Secure Global Scholar listening on: ${server.address().port}`);
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
        console.log(`Global Scholar listening on 80 for HTTPS redirect`);
      });
  } else {
    server = app.listen(port, () => {
      console.log(`Global Scholar ${env} listening on: ${server.address().port}`);
    });
  }
};

// Run the server
setupServer();
