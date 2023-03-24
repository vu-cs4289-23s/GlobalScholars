import { object, string, array, date } from "yup";

const Post = (app) => {
  /**
   * Create a new post
   *
   * @param {req.body.content} Content contents of post
   * @param {req.body.tags} Tags tags associated with post
   * @param {req.body.location} Location location object associated with post
   * @param {req.body.program} Program program object associated with post
   * @return {201, {id: ID of new post}} Return ID of new post
   */
  app.post("/api/v1/post", async (req, res) => {
    // Verify user is logged in
    if (!req.session.user)
      return res.status(401).send({ error: "unauthorized" });

    // Define post schema
    const schema = object({
      title: string().required().min(1).max(50),
      content: string().required().min(1).max(250),
   //   tags: array().required().min(1),
      city: string().optional(),
      program_name: string().optional(),
    });

    // Validate request body
    let data;
    try {
      data = await schema.validate(await req.body);

      // Set up new post
      let newPost = {
        owner: req.session.user._id,
        timestamp: Date.now(),
        title: data.title,
        content: data.content,
        tags: data.tags,
        likes: 0,
        dislikes: 0,
        saves: 0,
        program: null,
        location: null,
      };

      // Try to fetch for a matching program name
      const program = await app.models.Program.findOne({
        program_name: { $regex : new RegExp(data.program_name, "i") }
      });
      if (program && program !== "") {
        newPost.program = program._id;
      }

      // Try to fetch for a matching location name
      const location = await app.models.Location.findOne({
        city: { $regex : new RegExp(data.city, "i") }
      });
      if (location && location !== "") {
        newPost.location = location._id;
      }

      // Save post to model
      let post = new app.models.Post(newPost);

      try {
        await post.save();
        const query = { $push: { posts: post._id } };

        // Update User owner document
        await app.models.User.findByIdAndUpdate(req.session.user._id, query);

        // Success, send Post id to client
        res.status(201).send(newPost);
      } catch (err) {
        console.log(`Post.create save failure: ${err}`);
        res.status(400).send({ error: "failure creating post" });
      }
    } catch (err) {
      console.log(err);
      const message = err.details[0].message;
      console.log(`Post.create validation failure: ${message}`);
      res.status(400).send({ error: message });
    }
  });

  /**
   * Fetch post by id
   *
   * @param (req.params.id} Id of post to fetch
   * @return {200} Post information
   */
  app.get("/api/v1/post/:id", async (req, res) => {
    // Fetch post filtering by id
    let data;
    try {
      data = await app.models.Post
        .findById(req.params.id)
        .populate("owner", {
          username: 1,
          avatar_url: 1,
        });

      // Check if post exists
      if (!data) {
        res.status(404).send({ error: `unknown post: ${req.params.id}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown post: ${req.params.id}` });
    }
  });

  /**
   * Fetch all posts
   *
   * @return {200} Post information
   */
  app.get("/api/v1/posts", async (req, res) => {
    let data;
    try {
      data = await app.models.Post
        .find({})
        .populate("owner", {
          username: 1,
          avatar_url: 1,
        });

      if (!data) {
        res.status(404).send({ error: `there are no posts to fetch` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `there are no posts to fetch` });
    }
  });

  /**
   * Fetch posts by location
   *
   * @param (req.params.location} Location of posts to fetch
   * @return {200} Post information
   */
  app.get("/api/v1/posts/location/:location", async (req, res) => {
    // Fetch posts filtering by location
    let data, location;
    try {
      location = await app.models.Location.findOne({
        city: { $regex : new RegExp(req.params.location, "i") }
      });

      // Fetch and populate owner data
      data = await app.models.Post
        .find({
          location: location._id
        })
        .populate("owner", {
          username: 1,
          avatar_url: 1,
        });

      // Check if posts exist
      if (!data) {
        res.status(404).send({ error: `unknown posts for location: ${req.params.location}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for location: ${req.params.location}` });
    }
  });

  /**
   * Fetch posts by location name and tags
   *
   * @param (req.params.location} Location of posts to fetch
   * @param (req.params.tags} Tags of posts to fetch
   * @return {200} Post information
   */
  app.get("/api/v1/posts/location/:location/:tags", async (req, res) => {
    // Fetch posts filtering by location and tags
    let data, location;
    try {
      location = await app.models.Location.findOne({
        city: { $regex : new RegExp(req.params.location, "i") }
      });
      data = await app.models.Post.find({
        location: location._id,
        tags: req.params.tags,
      })
        .populate("owner", {
          username: 1,
          avatar_url: 1,
        });

      // Check if posts exist
      if (!data) {
        res.status(404).send({ error: `unknown posts for location and tags: ${req.params.location} & ${req.params.tags}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for location and tags: ${req.params.location} & ${req.params.tags}` });
    }
  });

  /**
   * Fetch posts by program
   *
   * @param (req.params.program} Program of posts to fetch
   * @return {200} Post information
   */
  app.get("/api/v1/posts/program/:program", async (req, res) => {
    // Fetch posts filtering by program
    let data, program;
    try {
      program = await app.models.Program.findOne({
        program_name: { $regex : new RegExp(req.params.program, "i") }
      });
      data = await app.models.Post
        .find({
          program: program._id
        })
        .populate("owner", {
          username: 1,
          avatar_url: 1,
        });

      // Check if posts exist
      if (!data) {
        res.status(404).send({ error: `unknown posts for program: ${req.params.program}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for program: ${req.params.program}` });
    }
  });

  /**
   * Fetch posts by program and tags
   *
   * @param (req.params.program} Program of posts to fetch
   * @param (req.params.tags} Tags of posts to fetch
   * @return {200} Post information
   */
  app.get("/api/v1/posts/program/:program/:tags", async (req, res) => {
    // Fetch posts filtering by program and tags
    let data, program;
    try {
      program = await app.models.Program.findOne({
        program_name: { $regex : new RegExp(req.params.program, "i") }
      });

      data = await app.models.Post
        .find({
          program: program._id,
          tags: req.params.tags,
        })
        .populate("owner", {
          username: 1,
          avatar_url: 1,
        });

      // Check if posts exist
      if (!data) {
        res.status(404).send({ error: `unknown posts for program and tags: ${req.params.program} & ${req.params.tags}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for program and tags: ${req.params.program} & ${req.params.tags}` });
    }
  });

  /**
   * Fetch posts by user
   *
   * @param (req.params.user} Username of owner of posts to fetch
   * @return {200} Post information
   */
  app.get("/api/v1/posts/user/:user", async (req, res) => {
    // Fetch user first
    let user;
    try {
      user = await app.models.User.findOne({
        username: { $regex : new RegExp(req.params.user, "i") }
      });

      // User does not exist
      if (!user) {
        res.status(404).send({ error: `unknown user: ${req.params.user}` });
      }
      else {
        // Fetch posts by user
        let data;
        try {
          data = await app.models.Post
            .find({
              owner: user._id
            })
            .populate("owner", {
              username: 1,
              avatar_url: 1,
            });

          // Posts don't exist
          if (!data) {
            res.status(404).send({ error: `unknown posts for user: ${req.params.user}` });
          } else {
            // Successful fetch of posts, send back to client
            res.status(200).send(data);
          }
        } catch (err) {
          console.log(`Post.get failure: ${err}`);
          res.status(404).send({ error: `unknown posts for user: ${req.params.user}` });
        }
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown user: ${req.params.user}` });
    }
  });

  /**
   * Fetch posts by tags
   *
   * @param (req.params.tags} Tags of posts to fetch
   * @return {200} Post information
   */
  app.get("/api/v1/posts/tags/:tags", async (req, res) => {
    // Fetch posts filtering by tags
    let data;
    try {
      data = await app.models.Post
        .find({
          tags: req.params.tags
        })
        .populate("owner", {
          username: 1,
          avatar_url: 1,
        });

      // Check if posts exist
      if (!data) {
        res.status(404).send({ error: `unknown posts for tags: ${req.params.tags}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for tags: ${req.params.tags}` });
    }
  });

  /**
   * Edit Post content
   *
   * @param (req.params.id} Id of post to update
   * @param {req.body.content}
   * @return {200} Updated post
   */
  app.put("api/v1/post/edit/:id", async (req, res) => {
    // Define post schema
    const schema = object({
      content: string().min(1).max(250),
    });

    // Validate data schema
    let data;
    try {
      data = await schema.validate(await req.body);

      let post;
      try {
        // Find post
        post = await app.models.Post.findById(req.params.id);

        // Validate user in session owns post
        if (req.session.user._id !== post.owner.toString()) {
          return res.status(401).send({ error: "unauthorized" });
        }

        // Find Post and update contents and timestamp
        const update =  {
          content: data.content,
          timestamp: Date.now(),
        }
        try {
          await app.models.Post.findByIdAndUpdate(
            req.params.id,
            { $set: update },
            { new: true }
          );
          // Send success to client
          res.status(204).end();
        } catch (err) {
          console.log(
            `Post.update post not found: ${req.params.id}`
          );
          res.status(500).end();
        }
      } catch (err) {
        console.log(
          `Post.update post not found: ${req.params.id}`
        );
        res.status(500).end();
      }
    } catch (err) {
      console.log(err);
      const message = err.details[0].message;
      console.log(`Post.update validation failure: ${message}`);
      res.status(400).send({ error: message });
    }
  });

  /**
   * Update Post statistics
   *
   * @param (req.params.id} Id of post to update
   * @param {req.body.likes}
   * @param {req.body.dislikes}
   * @param {req.body.saves}
   * @return {200} Updated post
   */
  app.put("api/v1/post/update/:id", async (req, res) => {
    // TODO
  });
};

export default Post;