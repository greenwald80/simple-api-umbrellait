const express = require("express");
const app = express();

// parse application/json
app.use(require("body-parser").json());

//register endpoints
require("./api/index")(app);
app.listen(3000, (err) => {
  if (err) throw err;
  console.log("server started!");
});
