const AnotherApi = (app) => {
  app.get("/api/v1/anotherapi", (req, res) => {
    res.send(
      'you reached /api/v1/anotherapi endpoint in the file "backend/api/another-api.js"'
    );
  });
};

export default AnotherApi;
