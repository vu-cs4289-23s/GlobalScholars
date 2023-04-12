import { object, string, array, number } from 'yup';

const tripSchema = object({
  destination: string().required(),
  start_date: number().required(),
  end_date: number().required(),
});

const Trip = (app) => {
  /**
   * Our matching algorithm for location
   * @param {req.body.destination} String - The destination of the trip
   * @param {req.body.start_date} Number - The start month and year of the trip in unix epoch time
   * @param {req.body.end_date} Number - The end month and year of the trip in unix epoch time
   */
  app.post('/api/v1/trip', async (req, res) => {
    //validate the request body
    try {
      await tripSchema.validate(req.body);
      if (req.body.start_date > req.body.end_date) {
        return res
          .status(400)
          .send({ error: 'Start date must be before end date' });
      }
    } catch (err) {
      console.log('err: ', err);
      res.status(400).send({ error: err.errors });
    }

    try {
      const location = await app.models.Location.findOne({
        city: { $regex: new RegExp(req.body.destination, 'i') },
      });
      let trips = location.trips;
      console.log('trips before filter: ', trips);
      const filteredTrips = await Promise.all(
        trips.map(async (tripId) => {
          const trip = await app.models.Trip.findById(tripId).exec();
          // return true if the any of the range of dates overlap
          if (
            (trip.start_date >= req.body.start_date &&
              trip.start_date <= req.body.end_date) ||
            (trip.end_date >= req.body.start_date &&
              trip.end_date <= req.body.end_date)
          ) {
            return trip;
          } else {
            return null;
          }
        })
      );
      const result = filteredTrips.filter((trip) => trip);
      console.log('trips after filter: ', result);

      //TODO genearate values for cost, rating, and cheapest month based on the location
      res.status(200).send(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};

export default Trip;
