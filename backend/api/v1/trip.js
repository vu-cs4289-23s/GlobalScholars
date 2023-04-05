const Trip = (app) => {
  app.post('/api/v1/trip', async (req, res) => {
    try {
      const trips = await app.models.Location.findOne({
        city: req.body.to.city,
      });

      //TODO genearate values for cost, rating, and cheapest month based on the location data
      res.status(200).send(trips);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};

export default Trip;
