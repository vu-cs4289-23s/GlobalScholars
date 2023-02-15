import { object, string } from "yup";
const User = (app) => {
  // TODO: add endpoints
  const schema = object({
    username: string()
      .required()
      .min(5)
      .max(16)
      .matches(/^[a-zA-Z0-9]+$/i),
    primary_email: string().required().email(),
    first_name: string().default(""),
    last_name: string().default(""),
    city: string().default(""),
    password: string().required(),
    avatar_url: string().optional(),
  });
  /**
   * Create a new user
   *
   * @param {req.body.username} Display name of the new user
   * @param {req.body.first_name} First name of the user - optional
   * @param {req.body.last_name} Last name of the user - optional
   * @param {req.body.city} City user lives in - optional
   * @param {req.body.primary_email} Email address of the user
   * @param {req.body.password} Password for the user
   * @param {req.body.avatar_url} URL of the user's avatar - optional
   * @return {201, {username,primary_email}} Return username and others
   */
  app.post("/api/v1/user", async (req, res) => {
    // Validate user input
    let data;
    try {
      data = await schema.validate(await req.body);
    } catch (err) {
      const message = err;
      console.log(`User.create validation failure: ${message}`);
      return res.status(400).send({ error: message });
    }

    // Try to create the user
    try {
      let user = new app.models.User(data);
      console.log("USER: ", user);
      await user.save();
      // Send the happy response back
      res.status(201).send({
        username: data.username,
        primary_email: data.primary_email,
      });
    } catch (err) {
      console.log(err);
      // Error if username is already in use
      if (err.code === 11000) {
        if (err.message.indexOf("username_1") !== -1)
          res.status(400).send({ error: "username already in use" });
        if (err.message.indexOf("primary_email_1") !== -1)
          res.status(400).send({ error: "email address already in use" });
      }
      // Something else in the username failed
      else res.status(400).send({ error: "invalid username" });
    }
  });

  /**
   * See if user exists
   *
   * @param {req.params.username} Username of the user to query for
   * @return {200 || 404}
   */
  app.head("/api/v1/user/:username", async (req, res) => {
    let user = await app.models.User.findOne({
      username: req.params.username.toLowerCase(),
    });
    if (!user)
      res.status(404).send({ error: `unknown user: ${req.params.username}` });
    else res.status(200).end();
  });

  /**
   * Fetch user information
   *
   * @param {req.params.username} Username of the user to query for
   * @return {200, {username, primary_email, first_name, last_name, city, avatar_url,}}
   */
  app.get("/api/v1/user/:username", async (req, res) => {
    let user = await app.models.User.findOne({
      username: req.params.username.toLowerCase(),
    }).exec();

    if (!user) {
      //try with player id
      user = await app.models.User.findOne({
        _id: req.params.username.toLowerCase(),
      }).exec();
      if (!user) {
        return res
          .status(404)
          .send({ error: `unknown user: ${req.params.username}` });
      }
    }
    res.status(200).send({
      username: user.username,
      primary_email: user.primary_email,
      first_name: user.first_name,
      last_name: user.last_name,
      city: user.city,
      avatar_url: user.avatar_url,
    });
  });
};

export default User;
