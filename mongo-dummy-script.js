// Connect to mongo
import { Schema } from "mongoose";

const db = connect("mongodb://localhost:55000/globalscholars");

// Insert user
db.users.insertOne({
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
});

// Insert location
db.locations.insertOne({
  city: "copenhagen",
  country: "Denmark",
  description: "This will be an auto generated description of the location.",
  // programs: [discopenhagen._id],
  like_cnt: 250,
});

// Insert program
db.programs.insertOne({
  location: new ObjectId("this must be the ID of the location above"),
  program_name: "DIS Copenhagen",
  description: "This will be an auto generated description of the program.",
  majors: ["Computer Science"],
  semesters: ["Fall", "Spring", "Summer"],
  // courses: [{ type: String, default: "" }],
  // estimated_budget: [{ type: Schema.ObjectId, ref: "PriceEstimate" }],
  // prerequisites: [{ type: String, default: "" }],
  language: ["English"],
  like_cnt: 24,
});

// Insert posts
db.posts.insertMany([
  {
    owner: new ObjectId("this must be the ID of the user above"),
    timestamp: Date.now(),
    content: "YAY it's working!!!",
    tags: ["Travel", "Language"],
    likes: 123,
    dislikes: 3,
    saves: 4,
    location: new ObjectId("this must be the ID of the location above"),
    program: new ObjectId("this must be the ID of the program above")
  },
  {
    owner: new ObjectId("this must be the ID of the user above"),
    timestamp: Date.now()-1,
    content: "This is a fake post from testinguser17. I am currently studying abroad " +
      "in copenhagen and love this city so much. I recommend visiting Tivoli Gardens " +
      "during the winter Holidays and drinking glogg.",
    tags: ["Travel", "Culture"],
    likes: 123,
    dislikes: 3,
    saves: 4,
  },
  {
    owner: new ObjectId("this must be the ID of the user above"),
    timestamp: Date.now()-1,
    content: "I partied at Chateau Motel last night and it was crazy",
    tags: ["Travel", "Social"],
    likes: 123,
    dislikes: 3,
    saves: 4,
  },
]);

// BELOW IS FOR FORUM TEST PURPOSES


// ObjectId("63fd643be253a847ddf1057d")
db.locations.insertOne({
  city: "Copenhagen",
  country: "Denmark",
  description: "Copenhagen is the coolest city ever this is my detailed description of the city!",
  like_cnt: 1087,
  overall_rating: 4.8,
  safety_rating: 4.5,
  affordability_rating: 2.0,
  sightseeing_rating: 3.2,
  top_tags: ["Social", "Travel", "Safety"],
});

// Helpful to test Forum

// ObjectId("63fd659de253a847ddf1057e")
db.programs.insertOne({
  program_name: "DIS Copenhagen",
  geo_link: "https://www.vanderbilt.edu/geo/programs/?program_id=1005",
  location: [ObjectId("63fd643be253a847ddf1057d")],
  terms: ["Fall", "Full Academic Year", "Spring"],
  restrictions: "Vanderbilt applicants only",
  type: "Study Center",
  calendar: "Similar to VU",
  housing: ["Apartment (shared)", "Dormitory", "Homestay"],
  min_gpa: 3,
  language_of_instruction: "English",
  language_prerequisite: "No",
  additional_prerequisite: "Yes, see program homepage",
  image_link: "https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/234/2017/12/11205256/brochure_1005.jpg",
  program_link: "https://disabroad.org/copenhagen/",
  overall_rating: 4.7,
  safety_rating: 5.0,
  affordability_rating: 2.3,
  sightseeing_rating: 3.8,
  top_tags: ["Safety", "Travel", "Social"],
});

// add programs to Copenhagen data now
db.locations.updateOne(
  { city: "Copenhagen" },
  { $set: {"programs": [ObjectId("63fd659de253a847ddf1057e")]} },
  false,
  true
);

db.locations.insertOne({ city: "paris", country: "france", description: "This will be a description about Paris!", like_cnt: 250 });