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

    })

  })
};

export default Post;