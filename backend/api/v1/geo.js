import { object, string, array, date } from "yup";

const GEOData = (app) => {
  /**
   * Fetch all programs in database
   *
   * @return {200} Program information
   */
  app.get("/api/v1/geo/programs", async (req, res) => {
    let data;
    try {
      data = await app.models.Program.find({});

      if (!data) {
        res.status(404).send({ error: `there are no programs to fetch` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `there are no programs to fetch` });
    }
  });

  /**
   * Fetch program in database by program name
   *
   * @return {200} Program information
   */
  app.get("/api/v1/geo/program/:name", async (req, res) => {
    let data;
    try {
      data = await app.models.Program.find({ program_name: req.params.name.toLowerCase() });

      if (!data) {
        res.status(404).send({ error: `there are no programs to fetch` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `there are no programs to fetch` });
    }
  });

  /**
   * Fetch all locations in database
   *
   * @return {200} Program information
   */
  app.get("/api/v1/geo/locations", async (req, res) => {
    let data;
    try {
      data = await app.models.Location.find({});

      if (!data) {
        res.status(404).send({ error: `there are no locations to fetch` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Post.get failure: ${err}`);
      res.status(404).send({ error: `there are no location to fetch` });
    }
  });

};

export default GEOData;