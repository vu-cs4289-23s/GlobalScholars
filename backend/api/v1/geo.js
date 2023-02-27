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
      console.log(`Program.get failure: ${err}`);
      res.status(404).send({ error: `there are no programs to fetch` });
    }
  });

  /**
   * Fetch program in database by program name
   *
   * @param (req.params.name} program_name of the program to fetch
   * @return {200} Program information
   */
  app.get("/api/v1/geo/program/:name", async (req, res) => {
    let data;
    try {
      data = await app.models.Program.find({
        program_name: { $regex : new RegExp(req.params.name, "i") }
      });

      if (!data) {
        res.status(404).send({ error: `the specified program ${req.params.name} does not exist` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Program.get failure: ${err}`);
      res.status(404).send({ error: `the specified program ${req.params.name} does not exist` });
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
      console.log(`Location.get failure: ${err}`);
      res.status(404).send({ error: `there are no locations to fetch` });
    }
  });

  /**
   * Fetch location in database by location name
   *
   * @param (req.params.city} city of location to fetch
   * @return {200} Location information
   */
  app.get("/api/v1/geo/location/:name", async (req, res) => {
    let data;
    try {
      data = await app.models.Location.find({
        city: { $regex : new RegExp(req.params.name, "i") }
      });

      if (!data) {
        res.status(404).send({ error: `the specified program ${req.params.name} does not exist` });
      } else {
        // Successful fetch, send to client
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(`Location.get failure: ${err}`);
      res.status(404).send({ error: `the specified program ${req.params.name} does not exist` });
    }
  });

  /**
   * Fetch program or location information for forum
   *
   * @param (req.params.name} program_name of the program to fetch
   * @return {200} Program information
   */
  app.get("/api/v1/geo/forum/:name", async (req, res) => {
    let program, location;
    try {
      // Try to fetch for a matching program or location name
      program = await app.models.Program.find({
        program_name: { $regex : new RegExp(req.params.name, "i") }
      });
      location = await app.models.Location.find({
        city: { $regex : new RegExp(req.params.name, "i") }
      });

      // Successful fetch, send to client
      const data = {
        location: location,
        program: program,
      }
      res.status(200).send(data);
    } catch (err) {
      console.log(`Program/Location.get failure: ${err}`);
      res.status(404).send({ error: `the specified name ${req.params.name} does not exist as a program or location` });
    }
  });
};

export default GEOData;