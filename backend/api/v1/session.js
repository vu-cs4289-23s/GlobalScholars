import { object, string } from "yup";
import coffescript from "coffeescript";

coffescript.register();

const Session = (app) => {
  /**
   * Log a user in
   *
   * @param {req.body.username} Username of user trying to log in
   * @param {req.body.password} Password of user trying to log in
   * @return { 200, {username, primary_email} }
   */
  app.post("/api/v1/session", async (req, res) => {
    // Validate incoming request has username and password, if not return 400:'username and password are required'
    const schema = object({
      username: string().lowercase().required(),
      password: string().required(),
    });
    try {
      const data = await schema.validate(await req.body);
      // Search database for user
      try {
        console.log(data);
        let user = await app.models.User.findOne({ username: data.username });
        if (!user) {
          user = await app.models.User.findOne({
            primary_email: data.username,
          });
        }
        if (!user) {
          res.status(401).send({ error: "unauthorized" });
        } else if (await user.authenticate(data.password)) {
          // Regenerate session when signing in to prevent fixation
          req.session.regenerate(() => {
            req.session.user = user;
            console.log(`Session.login success: ${req.session.user.username}`);
            // If a match, return 201:{ username, primary_email }
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
            });
          });
        } else {
          // If not a match, return 401:unauthorized
          console.log(`Session.login failed.  Incorrect credentials.`);
          res.status(401).send({ error: "unauthorized" });
        }
      } catch (err) {
        res.status(500).send({ error: "internal server error" });
      }
    } catch (err) {
      console.log(err);
      const message = err.details[0].message;
      console.log(`Session.login validation failure: ${message}`);
      res.status(400).send({ error: message });
    }
  });

  /**
   * Log a user out
   *
   * @return { 204 if was logged in, 200 if no user in session }
   */
  app.delete("/api/v1/session", (req, res) => {
    if (req.session.user) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(200).end();
    }
  });

  /**
   * Fetch the user in session
   */
  app.get("/api/v1/session", (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(200).send(undefined);
    }
  });
};

export default Session;
