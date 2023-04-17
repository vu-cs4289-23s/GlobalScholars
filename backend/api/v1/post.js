import { object, string, array, number } from 'yup';

// Define post schema
const postSchema = object({
  title: string().required().min(1).max(50),
  content: string().required().min(1).max(1500),
  tags: array().optional(),
  city: string().required(),
});

// Define trip schema
const tripSchema = object({
  trip_start_date: number().required(),
  trip_end_date: number().required(),
  title: string().required().min(1).max(50),
  overall_rating: string().required(),
  affordability_rating: string().required(),
  location: string().required(),
});

const Post = (app) => {
  /**
   * Create a new post by location
   *
   * @param {req.body.content} String contents of post
   * @param {req.body.tags} [Tags] tags associated with post
   * @param {req.body.city} String location string associated with post
   * @param {req.body.program} String program id for the associated program
   * @param {req.body.overall_rating} String overall rating for the location
   * @param {req.body.affordability_rating} String affordability rating for the location
   * @param {req.body.trip_start_date} Number start date of the trip in unix epoch time
   * @param {req.body.trip_end_date} Number end date of the trip in unix epoch time
   * @return {201, {id: ID of new post}} Return ID of new post
   */
  app.post('/api/v1/post/city', async (req, res) => {
    // Verify user is logged in
    if (!req.session.user)
      return res.status(401).send({ error: 'unauthorized' });

    // Validate request body
    let postData = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      city: req.body.city,
    };
    let tripData = {
      trip_start_date: req.body.trip_start_date,
      trip_end_date: req.body.trip_end_date,
      title: req.body.title,
      overall_rating: req.body.overall_rating,
      affordability_rating: req.body.affordability_rating,
      location: req.body.city,
    };

    try {
      // Validate schemas
      postData = await postSchema.validate(postData);
      tripData = await tripSchema.validate(tripData);
    } catch (err) {
      const message = err.details[0].message;
      console.log(`Post.create validation failure: ${message}`);
      res.status(400).send({ error: message });
    }

    // Set up new post
    let newPost = {
      owner: req.session.user._id,
      timestamp: Date.now(),
      title: postData.title,
      content: postData.content,
      city: postData.city,
      tags: postData.tags,
      likes: [],
      dislikes: [],
      saves: [],
      program: null,
      location: null,
    };
    // Set up new trip
    let newTrip = {
      owner: req.session.user._id,
      timestamp: Date.now(),
      title: tripData.title,
      content: postData.content,
      overall_rating: tripData.overall_rating,
      affordability_rating: tripData.affordability_rating,
      saves: [],
      location: null,
      start_date: tripData.trip_start_date,
      end_date: tripData.trip_end_date,
    };

    // Try to fetch for a matching location name
    let location;
    try {
      location = await app.models.Location.findOne({
        city: { $regex: new RegExp(postData.city, 'i') },
      });
      if (location && location !== '') {
        newPost.location = location._id;
        newTrip.location = location._id;
      }
    } catch (err) {
      console.log(`Post.create location fetch failure: ${err}`);
      res.status(400).send({ error: 'failure creating post' });
    }

    // Calculate average cost of trip and update it to location model
    let avg_affordability_rating = location.avg_affordability_rating;
    let avg_overall_rating = location.avg_overall_rating;
    //get the new averages
    avg_affordability_rating =
      (avg_affordability_rating * location.trips.length +
        parseInt(tripData.affordability_rating)) /
      (location.trips.length + 1);
    avg_overall_rating =
      (avg_overall_rating * location.trips.length +
        parseInt(tripData.overall_rating)) /
      (location.trips.length + 1);
    //update the location model
    location.avg_affordability_rating = avg_affordability_rating;
    location.avg_overall_rating = avg_overall_rating;

    let post = new app.models.Post(newPost);
    let trip = new app.models.Trip(newTrip);
    location.trips.push(trip._id);

    // Save post to model
    try {
      await post.save();
      await trip.save();
      await location.save();
      let query = { $push: { posts: post._id } };

      // Update User owner document
      await app.models.User.findByIdAndUpdate(req.session.user._id, query);

      // Success, send Post back
      res.status(201).send(newPost);
    } catch (err) {
      console.log(`Post.create save failure: ${err}`);
      res.status(400).send({ error: 'failure creating post' });
    }
  });

  /**
   * Create a new post by program
   *
   * @param {req.body.content} Content contents of post
   * @param {req.body.tags} Tags tags associated with post
   * @param {req.body.location} Location location object associated with post
   * @param {req.body.program} Program program object associated with post
   * @return {201, {id: ID of new post}} Return ID of new post
   */
  app.post('/api/v1/post/porgram', async (req, res) => {
    // Verify user is logged in
    if (!req.session.user)
      return res.status(401).send({ error: 'unauthorized' });

    // Define post schema
    const schema = object({
      title: string().required().min(1).max(50),
      content: string().required().min(1).max(1500),
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
        likes: [],
        dislikes: [],
        saves: [],
        program: null,
        location: null,
      };

      // Try to fetch for a matching program name
      const program = await app.models.Program.findOne({
        program_name: { $regex: new RegExp(data.program_name, 'i') },
      });
      if (program && program !== '') {
        newPost.program = program._id;
      }

      // Try to fetch for a matching location name
      const location = await app.models.Location.findOne({
        city: { $regex: new RegExp(data.city, 'i') },
      });
      if (location && location !== '') {
        newPost.location = location._id;
      }

      // Save post to model
      let post = new app.models.Post(newPost);

      try {
        await post.save();
        const query = { $push: { posts: post._id } };

        // Update User owner document
        await app.models.User.findByIdAndUpdate(req.session.user._id, query);

        // Success, send Post back
        res.status(201).send(newPost);
      } catch (err) {
        console.log(`Post.create save failure: ${err}`);
        res.status(400).send({ error: 'failure creating post' });
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
  app.get('/api/v1/post/:id', async (req, res) => {
    // Fetch post filtering by id
    let data;
    try {
      data = await app.models.Post.findById(req.params.id)
        .populate('owner', {
          username: 1,
          avatar_url: 1,
        })
        .populate('comments');

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
  app.get('/api/v1/posts', async (req, res) => {
    let data;
    try {
      data = await app.models.Post.find({}).populate('owner', {
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
  app.get('/api/v1/posts/location/:location', async (req, res) => {
    // Fetch posts filtering by location
    let data, location;
    try {
      location = await app.models.Location.findOne({
        city: { $regex: new RegExp(req.params.location, 'i') },
      });

      // Fetch and populate owner data
      data = await app.models.Post.find({
        location: location._id,
      }).populate('owner', {
        username: 1,
        avatar_url: 1,
      });

      // Check if posts exist
      if (!data) {
        res.status(404).send({
          error: `unknown posts for location: ${req.params.location}`,
        });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res
        .status(404)
        .send({ error: `unknown posts for location: ${req.params.location}` });
    }
  });

  /**
   * Fetch posts by location name and tags
   *
   * @param (req.params.location} Location of posts to fetch
   * @param (req.params.tags} Tags of posts to fetch
   * @return {200} Post information
   */
  app.get('/api/v1/posts/location/:location/:tags', async (req, res) => {
    // Fetch posts filtering by location and tags
    let data, location;
    try {
      location = await app.models.Location.findOne({
        city: { $regex: new RegExp(req.params.location, 'i') },
      });
      data = await app.models.Post.find({
        location: location._id,
        tags: req.params.tags,
      }).populate('owner', {
        username: 1,
        avatar_url: 1,
      });

      // Check if posts exist
      if (!data) {
        res.status(404).send({
          error: `unknown posts for location and tags: ${req.params.location} & ${req.params.tags}`,
        });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({
        error: `unknown posts for location and tags: ${req.params.location} & ${req.params.tags}`,
      });
    }
  });

  /**
   * Fetch posts by program
   *
   * @param (req.params.program} Program of posts to fetch
   * @return {200} Post information
   */
  app.get('/api/v1/posts/program/:program', async (req, res) => {
    // Fetch posts filtering by program
    let data, program;
    try {
      program = await app.models.Program.findOne({
        program_name: { $regex: new RegExp(req.params.program, 'i') },
      });
      data = await app.models.Post.find({
        program: program._id,
      }).populate('owner', {
        username: 1,
        avatar_url: 1,
      });

      // Check if posts exist
      if (!data) {
        res
          .status(404)
          .send({ error: `unknown posts for program: ${req.params.program}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res
        .status(404)
        .send({ error: `unknown posts for program: ${req.params.program}` });
    }
  });

  /**
   * Fetch posts by program and tags
   *
   * @param (req.params.program} Program of posts to fetch
   * @param (req.params.tags} Tags of posts to fetch
   * @return {200} Post information
   */
  app.get('/api/v1/posts/program/:program/:tags', async (req, res) => {
    // Fetch posts filtering by program and tags
    let data, program;
    try {
      program = await app.models.Program.findOne({
        program_name: { $regex: new RegExp(req.params.program, 'i') },
      });

      data = await app.models.Post.find({
        program: program._id,
        tags: req.params.tags,
      }).populate('owner', {
        username: 1,
        avatar_url: 1,
      });

      // Check if posts exist
      if (!data) {
        res.status(404).send({
          error: `unknown posts for program and tags: ${req.params.program} & ${req.params.tags}`,
        });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({
        error: `unknown posts for program and tags: ${req.params.program} & ${req.params.tags}`,
      });
    }
  });

  /**
   * Fetch posts by user
   *
   * @param (req.params.user} Username of owner of posts to fetch
   * @return {200} Post information
   */
  app.get('/api/v1/posts/user/:user', async (req, res) => {
    // Fetch user first
    let user;
    try {
      user = await app.models.User.findOne({
        username: { $regex: new RegExp(req.params.user, 'i') },
      });

      // User does not exist
      if (!user) {
        res.status(404).send({ error: `unknown user: ${req.params.user}` });
      } else {
        // Fetch posts by user
        let data;
        try {
          data = await app.models.Post.find({
            owner: user._id,
          }).populate('owner', {
            username: 1,
            avatar_url: 1,
          });

          // Posts don't exist
          if (!data) {
            res
              .status(404)
              .send({ error: `unknown posts for user: ${req.params.user}` });
          } else {
            // Successful fetch of posts, send back to client
            res.status(200).send(data);
          }
        } catch (err) {
          console.log(`Post.get failure: ${err}`);
          res
            .status(404)
            .send({ error: `unknown posts for user: ${req.params.user}` });
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
  app.get('/api/v1/posts/tags/:tags', async (req, res) => {
    // Fetch posts filtering by tags
    let data;
    try {
      data = await app.models.Post.find({
        tags: req.params.tags,
      }).populate('owner', {
        username: 1,
        avatar_url: 1,
      });

      // Check if posts exist
      if (!data) {
        res
          .status(404)
          .send({ error: `unknown posts for tags: ${req.params.tags}` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res
        .status(404)
        .send({ error: `unknown posts for tags: ${req.params.tags}` });
    }
  });

  /**
   * Edit Post content
   *
   * @param (req.params.id} Id of post to update
   * @param {req.body.content}
   * @return {200} Updated post
   */
  app.put('api/v1/post/edit/:id', async (req, res) => {
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
          return res.status(401).send({ error: 'unauthorized' });
        }

        // Find Post and update contents and timestamp
        const update = {
          content: data.content,
          timestamp: Date.now(),
        };
        try {
          await app.models.Post.findByIdAndUpdate(
            req.params.id,
            { $set: update },
            { new: true }
          );
          // Send success to client
          res.status(204).end();
        } catch (err) {
          console.log(`Post.update post not found: ${req.params.id}`);
          res.status(500).end();
        }
      } catch (err) {
        console.log(`Post.update post not found: ${req.params.id}`);
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
  app.put('api/v1/post/update/:id', async (req, res) => {
    // TODO: make endpoint
  });
};

export default Post;
