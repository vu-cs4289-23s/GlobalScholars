import { object, string, array, date } from "yup";

const Post = (app) => {

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
};

export default Post;