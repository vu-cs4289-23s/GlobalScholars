const OneApi = (app) => {
  app.get("/api/v1/oneapi", (req, res) => {
    res.send("You reached /api/v1/oneapi");
  });
};

export default OneApi;
