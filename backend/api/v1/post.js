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
  app.post(`api/v1/post`, async (req, res) => {
    // Verify user is logged in
    if (!req.session.user)
      return res.status(401).send({ error: "unauthorized" });

    // Define post schema
    const schema = object({
      content: string().required().min(1).max(250),
      tags: array().required().min(1),
      location: object(),
      program: object(),
    }) ;

    // Validate request body
    let data;
    try {
      data = await schema.validate(await req.body);

      // Set up new post
      let newPost = {
        owner: req.session.user._id,
        timestamp: Date.now(),
        content: data.content,
        tags: data.tags,
        likes: 0,
        dislikes: 0,
        saves: 0,
        location: data.location,
        program: data.program,
      };

      let post = new app.models.Post(newPost);
      try {
        await post.save();
        const query = { $push: { posts: post._id } };

        // Save post to user's document
        await app.models.User.findByIdAndUpdate(req.session.user._id, query);
        res.status(201).send({ id: game._id });
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

  // GET Post by id specified in request params
  app.get(`/api/v1/post/:id`, async (req, res) => {
    let data;
    try {
      data = await app.models.Post.findById(req.params.id);

      if (!data) {
        res.status(404).send({ error: `unknown post: ${req.params.id}` });
      } else {
        // Can do more here to fetch extra information
        // Fetch User by Post owner id
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown post: ${req.params.id}` });
    }
  });

  // GET all Posts by location specified in request params
  app.get(`/api/v1/posts/:location`, async (req, res) => {
    let data;
    try {
      data = await app.models.Post.find({ location: req.params.location });

      if (!data) {
        res.status(404).send({ error: `unknown posts for location: ${req.params.location}` });
      } else {
        // Can do more here to fetch extra information
        // Fetch User by Post owner id
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for location: ${req.params.location}` });
    }
  });

  // GET all Posts by location and tags specified in request params
  app.get(`/api/v1/posts/:location:tags`, async (req, res) => {
    let data;
    try {
      data = await app.models.Post.find({
        location: req.params.location,
        tags: req.params.tags,
      });

      if (!data) {
        res.status(404).send({ error: `unknown posts for location and tags: ${req.params.location} & ${req.params.tags}` });
      } else {
        // Can do more here to fetch extra information
        // Fetch User by Post owner id
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for location and tags: ${req.params.location} & ${req.params.tags}` });
    }
  });

  // GET all Posts by program specified in request params
  app.get(`/api/v1/posts/:program`, async (req, res) => {
    let data;
    try {
      data = await app.models.Post.find({ program: req.params.program });

      if (!data) {
        res.status(404).send({ error: `unknown posts for location: ${req.params.program}` });
      } else {
        // Can do more here to fetch extra information
        // Fetch User by Post owner id
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for location: ${req.params.program}` });
    }
  });

  // GET all Posts by program and tags specified in request params
  app.get(`/api/v1/posts/:program:tags`, async (req, res) => {
    let data;
    try {
      data = await app.models.Post.find({
        program: req.params.program,
        tags: req.params.tags,
      });

      if (!data) {
        res.status(404).send({ error: `unknown posts for location and tags: ${req.params.program} & ${req.params.tags}` });
      } else {
        // Can do more here to fetch extra information
        // Fetch User by Post owner id
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `unknown posts for location and tags: ${req.params.program} & ${req.params.tags}` });
    }
  });

  // GET all Posts by User username specified in request params
  app.get(`/api/v1/posts/:user`, async (req, res) => {
    // Fetch user
    let user;
    try {
      user = await app.models.User.findOne({ username: req.params.user });

      // User does not exist
      if (!user) {
        res.status(404).send({ error: `unknown user: ${req.params.user}` });
      }
      else {
        // Fetch posts by user
        let data;
        try {
          data = await app.models.Post.find({ owner: user._id });

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
};

export default Post;