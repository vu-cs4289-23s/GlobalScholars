//bundle all api routes into one file to be exported

import AnotherApi from "./another-api.js";
import OneApi from "./one-api.js";
import Post from "./v1/post.js";
import Session from "./v1/session.js";
import User from "./v1/user.js";

const Routes = (app) => {
  AnotherApi(app);
  OneApi(app);

  Post(app);
  Session(app);
  User(app);
};

export default Routes;
