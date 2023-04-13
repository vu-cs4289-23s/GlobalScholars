// Import libraries
import path, { dirname } from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import envConfig from 'simple-env-config';
import pug from 'pug';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dummyjson from 'dummy-json';

// Import mongoose
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');

// Import models
import Post from './models/post.js';
import Program from './models/program.js';
import User from './models/user.js';
import Location from './models/location.js';
import Comment from './models/comment.js';
import PriceEstimate from './models/price_estimate.js';
import Trip from './models/trip.js';

// Import routes
import Routes from './api/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

const setupServer = async () => {
  // Get the app config
  const conf = await envConfig('../config.json', env);
  const port = process.env.PORT ? process.env.PORT : conf.port;

  // Setup our Express pipeline
  let app = express();
  app.use(
    cors({
      credentials: true,
    })
  );

  app.use(logger('dev'));
  app.set('views', __dirname);
  app.use(express.static(path.join(__dirname, '../dist')));
  // Setup pipeline session support
  app.store = session({
    name: 'session',
    secret: 'globallyscholaredsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
    },
  });
  app.use(app.store);

  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  try {
    // Connect to MongoDB
    mongoose.set('strictQuery', false);
    await mongoose.connect(conf.mongodb);
    mongoose.connection.on('disconnected', () => {
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
    Trip: Trip,
  };

  // Call routes
  Routes(app);

  app.get('/api/v1/generateDummyData', function (req, res) {
    let numberOfPosts = req.query.posts;
    if (numberOfPosts === undefined) {
      numberOfPosts = 10;
    }
    let numberOfUsers = req.query.users;
    if (numberOfUsers === undefined) {
      numberOfUsers = 3;
    }

    let users = Array.from(
      { length: numberOfUsers },
      () => new mongoose.Types.ObjectId()
    );
    const userss = users;

    // make an array of objectId that will be dynamic based on numberOfTimes
    const posts = Array.from(
      { length: numberOfPosts },
      () => new mongoose.Types.ObjectId()
    );
    const myPartials = {
      post: `{
        "_id": "{{postsArrayAtI}}",
        "owner": "{{randomUser}}",
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
      user: `{
        "_id": "{{userArrayAtI}}",
        "username": "username{{int 0 100}}",
        "first_name": "{{firstName}}",
        "last_name": "{{lastName}}",
        "primary_email": "{{email}}",
        "program": "{{company}}",
        "city": "{{city}}"
      }`,
    };
    const myHelpers = {
      postsArrayAtI() {
        const value = posts[0];
        posts.shift();
        return value;
      },
      userArrayAtI() {
        const value = users[0];
        users.shift();
        return value;
      },
      randomUser() {
        const value = userss[Math.floor(Math.random() * userss.length)];
        return value;
      },
    };
    const template = `{
      "posts": [
        {{#repeat ${numberOfPosts}}}
        {{> post }}
        {{/repeat}}
      ],
      "users": [
        {{#repeat ${numberOfUsers}}}
        {{> user }}
        {{/repeat}}
      ]
    }`;

    const result = dummyjson.parse(template, {
      partials: myPartials,
      helpers: myHelpers,
    });

    //convert json string to json object

    res.set('Content-Type', 'application/json');
    res.status(200).send(result);
  });
  app.use(express.static(resolve('../dist')));

  // // Give them the SPA base page
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const template = fs.readFileSync(resolve('../dist/index.html'), 'utf-8');

    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
  });

  // Run the server itself
  let server;
  if (env === 'production') {
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
