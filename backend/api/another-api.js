const AnotherApi = (app) => {
  app.get("/api/v1/anotherapi", (req, res) => {
    res.send("you reached /api/v1/anotherapi");
  });
};

export default AnotherApi;
