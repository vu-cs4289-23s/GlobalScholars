import { object, string, array, date } from "yup";
import md5 from "md5";

const User = (app) => {
  const schema = object({
    username: string()
      .required()
      .min(5)
      .max(16)
      .matches(/^[a-zA-Z0-9]+$/i),
    primary_email: string().required().email(),
    first_name: string().default(""),
    last_name: string().default(""),
    password: string().required(),
    avatar_url: string().optional(),
  });

  /**
   * validatePassword
   *
   * Validate user password is at least 8 chars in length, contains a number,
   * contains a lowercase, contains a special char, and contains an uppercase.
   * @param password
   * @returns {{error: string}|undefined}
   */
  const validatePassword = (password) => {
    if (!password || password.length < 8) {
      return { error: "password length must be > 7" };
    } else if (!password.match(/[0-9]/i)) {
      return { error: "password must contain a number" };
    } else if (!password.match(/[a-z]/)) {
      return { error: "password must contain a lowercase letter" };
    } else if (!password.match(/\@|\!|\#|\$|\%|\^/i)) {
      return { error: "password must contain @, !, #, $, % or ^" };
    } else if (!password.match(/[A-Z]/)) {
      return { error: "password must contain an uppercase letter" };
    }
    return undefined;
  };

  /**
   * validateVanderbiltEdu
   *
   * Validate a user email is @vanderbilt.edu
   * @param primary_email
   * @returns {{error: string}|undefined}
   */
  const validateVanderbiltEdu = (primary_email) => {
    if (
      !primary_email.includes("@") ||
      primary_email.split("@")[1].toLowerCase() !== "vanderbilt.edu"
    ) {
      return { error: "must register with a vanderbilt email" };
    }
    return undefined;
  };
  /**
   *  GravHash
   *
   * Returns the gravatar hash for a given email address
   * @param {email} email
   * @param {size of photo} size
   * @returns
   */
  const GravHash = (email, size) => {
    let hash = email && email.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    hash = hash && hash.toLowerCase();
    hash = hash && md5(hash);
    return `https://www.gravatar.com/avatar/${hash}?size=${size}`;
  };

  /**
   * Create a new user
   *
   * @param {req.body.username} Display name of the new user
   * @param {req.body.first_name} First name of the user - optional
   * @param {req.body.last_name} Last name of the user - optional
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

      // Password validation
      // const invalidPwd = validatePassword(data.password);
      // if (invalidPwd) {
      //   return res.status(400).send(invalidPwd);
      // }

      // Vanderbilt email validation
      // const invalidEmail = validateVanderbiltEdu(data.primary_email);
      // if (invalidEmail) {
      //   return res.status(400).send(invalidEmail);
      // }
    } catch (err) {
      const message = err;
      console.log(`User.create validation failure: ${message}`);
      return res.status(400).send({ error: message });
    }
    // Define avatar url
    data.avatar_url = GravHash(data.primary_email, 40);

    // Try to create the user
    try {
      let user = new app.models.User(data);

      console.log("USER: ", user);
      await user.save();
      // Send the happy response back
      res.status(201).send({
        username: data.username,
        primary_email: data.primary_email,
        avatar_url: data.avatar_url,
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
   * Create a new user with google
   *
   * @param {req.body.username} Display name of the new user
   * @param {req.body.first_name} First name of the user - optional
   * @param {req.body.last_name} Last name of the user - optional
   * @param {req.body.primary_email} Email address of the user
   * @param {req.body.password} Password for the user
   * @param {req.body.avatar_url} URL of the user's avatar - optional
   * @return {201, {username,primary_email}} Return username and others
   */
  app.post("/api/v1/user/google", async (req, res) => {
    let data = req.body;
    // Define avatar url
    if (!data.avatar_url) data.avatar_url = GravHash(data.primary_email, 40);
    // Try to create the user
    try {
      let user = new app.models.User(data);

      console.log("USER: ", user);
      await user.save();
      // Send the happy response back
      res.status(201).send({
        username: data.username,
        primary_email: data.primary_email,
        avatar_url: data.avatar_url,
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
   * Fetch user information via username
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
        username: req.params.username.toLowerCase(),
      }).exec();
      if (!user) {
        return res
          .status(404)
          .send({ error: `unknown user: ${req.params.username}` });
      }
    }
    if (user.avatar_url === "" || user.avatar_url === undefined) {
      user.avatar_url = GravHash(user.primary_email, 40);
      await user.save();
    }
    if (user.background_url === "" || user.background_url === undefined) {
      user.background_url =
        "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg";
      await user.save();
    }
    res.status(200).send({
      username: user.username,
      primary_email: user.primary_email,
      first_name: user.first_name,
      last_name: user.last_name,
      grad_year: user.grad_year,
      majors: user.majors,
      minors: user.minors,
      city: user.city,
      bio: user.bio,
      background_url: user.background_url,
      avatar_url: user.avatar_url,
      posts: user.posts,
      saves: user.saves,
    });
  });

  /**
   * Fetch user information via user id
   *
   * @param {req.params.id} ID of the user to query for
   * @return {200, {username, primary_email, first_name, last_name, city, avatar_url,}}
   */
  app.get("/api/v1/user/id/:id", async (req, res) => {
    // Fetch user filtering by id
    let data;
    try {
      data = await app.models.User.findById(req.params.id);

      // Check if user exists
      if (!data) {
        res.status(404).send({ error: `unknown user: ${req.params.id}` });
      } else {
        // Successful fetch, send user info to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`User.get failure: ${err}`);
      res.status(404).send({ error: `unknown user: ${req.params.id}` });
    }
  });

  /**
   * Update existing user
   *
   * @param {req.params.first_name} First name of the user to query for
   * @param {req.body.last_name} Last name of the user
   * @param {req.body.avatar_url} Avatar photo of the user
   * @param {req.body.background_url} Background photo of the user
   * @param {req.body.majors} Majors of the user
   * @param {req.body.minors} Minors of the user
   * @param {req.body.grad_year} Grad year of the user
   * @return {204}
   */
  app.put("/api/v1/user", async (req, res) => {
    console.log("PUT /api/v1/user", req.session);
    // if (!req.session.user)
    //   return res.status(401).send({ error: "unauthorized" });

    const schema = object({
      first_name: string(),
      last_name: string(),
      avatar_url: string(),
      username: string(),
      background_url: string().optional(),
      majors: array(),
      minors: array(),
      grad_year: date(), //could also be a Number
      bio: string(),
    });

    try {
      const data = await schema.validate(await req.body);
      const query = { username: req.body.username };

      // check for empty string updates
      const prevData = await app.models.User.findOne(query);
      if (data.first_name === undefined) {
        data.first_name = prevData.first_name;
      }
      if (data.last_name === undefined) {
        data.last_name = prevData.last_name;
      }
      if (data.avatar_url === undefined) {
        data.avatar_url = prevData.avatar_url;
      }
      if (data.background_url === undefined) {
        data.background_url = prevData.background_url;
      }
      if (data.majors === undefined) {
        data.majors = prevData.majors;
      }
      if (data.minors === undefined) {
        data.minors = prevData.minors;
      }
      if (data.grad_year === undefined) {
        data.grad_year = prevData.grad_year;
      }

      // find user and update data
      try {
        req.session.user = await app.models.User.findOneAndUpdate(
          query,
          { $set: data },
          { new: true }
        );
        res.status(204).end();
      } catch (err) {
        console.log(
          `User.update logged-in user not found: ${req.session.user.id}`
        );
        res.status(500).end();
      }
    } catch (err) {
      const message = err.details[0].message;
      console.log(`User.update validation failure: ${message}`);
      res.status(400).send({ error: message });
    }
  });
};

export default User;
