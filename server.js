const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// create our express app
const app = express();
const graphQLHTTP = require("express-graphql");

const models = require("./models");
// console.log("models", models);

// set our static directory for css, images, and other static content
app.use(express.static("public"));
// parse the body for params etc...
app.use(bodyParser.json());
// or...
// can create separate parsers (middleware) for json and post params
// for routes sending json objects...
// const jsonParser = bodyParser.json();

// for routes submitting post params
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

// // importing DataLoaders
const loaders = require("./graphql/loaders");
const schema = require("./graphql/schema");

app.use(
  "/graphql",
  graphQLHTTP(req => ({
    schema,
    graphiql: true,
    context: {
      models,
      loaders
    }
  }))
);

app.post("/api/user", async (req, res) => {
  if (req.body) {
    const result = await models.User.create(req.body);
    return res.send(result).status(201);
  }
});
app.get("/", (req, res) => {
  return res.send("index page").status(200);
});

app.get("*", async (req, res) => {
  res.send("404 error").status(404);
});

const server = app.listen(process.env.PORT || 4999, () => {
  console.log("Example app is running → PORT ", process.env.PORT || 4999);
});
server.timeout = 3000;
