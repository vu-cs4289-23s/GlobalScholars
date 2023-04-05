const Trip = (app) => {
  app.get('/api/v1/trip', async (req, res) => {
    try {
      const trips = await app.models.Location.findOne({
        city: req.body.to.city,
      });
      res.status(200).send(trips);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};

export default Trip;
