// Connect to mongo
import { Schema } from "mongoose";

const db = connect("mongodb://localhost:55000/globalscholars");

const user = {
  username: "testuser123",
  first_name: "John",
  last_name: "Doe",
  primary_email: "johndoe4@vanderbilt.edu",
  password: "Testuser123!!",
  // avatar_url: ,
  // background_url: ,
  // city: "Nashville",
  // program: { type: Schema.Types.ObjectId, ref: "Program" },
  // majors: [{ type: String, default: "", }],
  // minors: [{ type: String, default: "", }],
  // grad_year: 2023,
  // posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  // saves: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  // likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  // dislikes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
}

const copenhagen = {
  city: "Copenhagen",
  country: "Denmark",
  description: "This will be an auto generated description of the location.",
  // programs: [discopenhagen._id],
  like_cnt: 250,
}

const discopenhagen = {
  location: [copenhagen._id],
  program_name: "DIS Copenhagen",
  description: "This will be an auto generated description of the program.",
  majors: ["Computer Science"],
  semesters: ["Fall", "Spring", "Summer"],
  // courses: [{ type: String, default: "" }],
  // estimated_budget: [{ type: Schema.ObjectId, ref: "PriceEstimate" }],
  // prerequisites: [{ type: String, default: "" }],
  language: ["English"],
  like_cnt: 24,
}

const time = Date.now();

db.users.insertOne(user);
db.locations.insertOne(copenhagen);
db.programs.insertOne(discopenhagen);

// Insert posts
// db.posts.insertMany([
//   {
//     owner: "63f952b7c17180ecb10349c5",
//     timestamp: Date.now(),
//     content: "This is a fake post from testuser123. I am currently studying abroad " +
//       "in copenhagen and love this city so much. I recommend visiting Tivoli Gardens " +
//       "during the winter Holidays and drinking glogg.",
//     tags: ["Travel", "Language"],
//     likes: 123,
//     dislikes: 3,
//     saves: 4,
//   },
//   {
//     owner: "63f952b7c17180ecb10349c5",
//     timestamp: Date.now()-1,
//     content: "This is a fake post from testuser123. I am currently studying abroad " +
//       "in copenhagen and love this city so much. I recommend visiting Tivoli Gardens " +
//       "during the winter Holidays and drinking glogg.",
//     tags: ["Travel", "Culture"],
//     likes: 123,
//     dislikes: 3,
//     saves: 4,
//   },
//   {
//     owner: "63f952b7c17180ecb10349c5",
//     timestamp: Date.now()-1,
//     content: "I partied at Chateau Motel last night and it was crazy",
//     tags: ["Travel", "Social"],
//     likes: 123,
//     dislikes: 3,
//     saves: 4,
//   },
// ])

// Insert posts
db.posts.insertMany([
  {
    owner: user._id,
    timestamp: time,
    content: "This is a fake post from testuser123. I am currently studying abroad " +
      "in copenhagen and love this city so much. I recommend visiting Tivoli Gardens " +
      "during the winter Holidays and drinking glogg.",
    tags: ["Travel", "Language"],
    likes: 123,
    dislikes: 3,
    saves: 4,
    location: copenhagen._id,
    program: discopenhagen._id,
  },
  {
    owner: user._id,
    timestamp: time-1,
    content: "This is a fake post from testuser123. I am currently studying abroad " +
      "in copenhagen and love this city so much. I recommend visiting Tivoli Gardens " +
      "during the winter Holidays and drinking glogg.",
    tags: ["Travel", "Culture"],
    likes: 123,
    dislikes: 3,
    saves: 4,
    location: copenhagen._id,
    program: discopenhagen._id,
  },
  {
    owner: user._id,
    timestamp: time-1,
    content: "I partied at Chateau Motel last night and it was crazy",
    tags: ["Travel", "Social"],
    likes: 123,
    dislikes: 3,
    saves: 4,
    location: copenhagen._id,
    program: discopenhagen._id,
  },
])

// In Mongosh terminal run the command below
// load("mongo-dummy-script.js")