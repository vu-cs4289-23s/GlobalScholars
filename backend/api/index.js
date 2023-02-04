//bundle all api routes into one file to be exported

import AnotherApi from "./another-api.js";
import OneApi from "./one-api.js";

const Api = (app) => {
  AnotherApi(app);
  OneApi(app);
};

export default Api;
