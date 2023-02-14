import { object, string } from "yup";
const Session = (app) => {
  // TODO: add endpoints

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
        let user = await app.models.User.findOne({ username: data.username });
        if (!user) res.status(401).send({ error: "unauthorized" });
        else if (await user.authenticate(data.password)) {
          // Regenerate session when signing in to prevent fixation
          req.session.regenerate(() => {
            req.session.user = user;
            console.log(`Session.login success: ${req.session.user.username}`);
            // If a match, return 201:{ username, primary_email }
            res.status(200).send({
              username: user.username,
              primary_email: user.primary_email,
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
};

export default Session;