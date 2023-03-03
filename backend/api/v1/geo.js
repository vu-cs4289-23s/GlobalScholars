import { object, string, array, date } from "yup";
import data from "../../../data.js";

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
      program = await app.models.Program.findOne({
        program_name: { $regex : new RegExp(req.params.name, "i") }
      });
      location = await app.models.Location.findOne({
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


  app.post("/api/v1/geo/populate", async (req, res) => {
    try {

      // dictionary of all the unique cities and countries
      let citiesDict = {};

      data.map( program => {
        const cities = program['City'];
        const countries = program['Country'];

        cities.map((city, index) => {
          citiesDict[city] = countries[index];
        })

      })

      for(let [citY, countrY] of Object.entries(citiesDict)) {
        // console.log(citY, countrY);

        const filter = {city: citY};
        const update = {country: countrY};

        let location_doc = await app.models.Location.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true
        });

        // now cities dict will be (key: value) => (city: _id in database)
        citiesDict[citY] = location_doc._id;

      }

      // city => location
      let city_to_location_id = {};

      const addToDB = data.map(async program => {

        const filter = (str) => {
          str = str.replace(',', '');
          if (isNaN(str)) {
            return 0;
          }
          return parseFloat(str);
        }

        let budget_id = undefined;

        if (!(program["Total Budget"] === null)) {

          let budget_doc = {
            total_budget: filter(program["Total Budget"]),
            budget_last_updated: program["Budget Last Updated"],
            admin_fee: filter(program["Administrative Fee Cost"]),
            airfare: filter(program["Airfare Cost"]),
            books_supplies: filter(program["Books/Supplies Cost"]),
            housing: filter(program["Housing Cost"]),
            local_transportation: filter(program["Local Transportation Cost"]),
            meals: filter(program["Meals Cost"]),
            personal_expenses: filter(program["Personal Expenses Cost"]),
            program_fee: filter(program["Program Fee Cost"]),
            total_out_of_pocket_cost: filter(program["Total Paid Out of Pocket Cost"]),
            total_paid_to_vanderbilt_cost: filter(program["Total Paid to Vanderbilt Cost"]),
            tuition_cost: filter(program["Tuition Cost"]),
            visa_residence_fee: filter(program["Visa/Residence Permit Cost"])
          };

          let budget = new app.models.PriceEstimate(budget_doc);
          await budget.save();

          // get the id of the budget also

          budget_id = budget._id;
        }

        // get all the locations
        let location_id_list = [];
        program["City"].map(city => {
          location_id_list.push(citiesDict[city]);
        });

        let program_doc = {
          program_name: program["Program Name"],
          geo_link: program["Program GEO Link"],
          location: location_id_list,
          terms: program["Program terms"],
          restrictions: program["Restrictions"],
          type: program["Type of Program"],
          academic_calendar: program["Academic Calendar"],
          housing: program["Housing"],
          min_gpa: program["Minimum GPA"],
          language_of_instruction: program["Language of Instruction"],
          language_prerequisite: program["Language prerequisite"],
          additional_prerequisite: program["Additional prerequisites"],
          image_link: program["Image Link"],
          program_link: program["Program Link"]
        };

        if (budget_id !== undefined) {
          program_doc.budget = budget_id;
        }

        let program_to_add = new app.models.Program(program_doc);
        await program_to_add.save();

        if (!(program["City"] in city_to_location_id)) {
          city_to_location_id[program["City"]] = [program_to_add._id];
        } else {
          city_to_location_id[program["City"]].push(program_to_add._id);
        }

      });

      await Promise.all(addToDB);

      const update_locations = Object.keys(city_to_location_id).map(async cit => {

        // query the location database for the city. Find one and update
        const filter = {city: cit};
        const update = {programs: city_to_location_id[cit]};

        await app.models.Location.findOneAndUpdate(filter, update);

      });

      await Promise.all(update_locations);

      res.status(200).send({Success: "Success"});
      return;
    } catch (err) {
      console.log(`Error: ${err}`)
      res.status(401).send({Error: `${err}`});
    }

  });

};

export default GEOData;