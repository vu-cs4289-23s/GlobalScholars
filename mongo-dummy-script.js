// Connect to mongo

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