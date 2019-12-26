const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

// create our express app
const app = express();
const graphQLHTTP = require("express-graphql");
const { graphqlUploadExpress } = require("graphql-upload");

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

// allow cross origin requests by adding following middleware
app.use((req, res, next) => {
  // Allow every client to send requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allowing only POST, GET & OPTIONS requests
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  // Allowing only 'Content-Type' & 'Authorization' Headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Token, X-Refresh-Token"
  );
  // When request method is OPTIONS
  // Don't allow request to reach our GraphQL API's
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// // importing DataLoaders
const loaders = require("./graphql/loaders");
const schema = require("./graphql/schema");

app.use(
  "/graphql",
  graphqlUploadExpress({
    uploadDir: "./uploads/",
    maxFileSize: 3000000,
    maxFiles: 10
  }),
  graphQLHTTP(req => ({
    schema,
    graphiql: true,
    context: {
      models,
      loaders
    }
  }))
);

app.get("/**", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
console.log("directory", __dirname, __filename);

// send status 404 if request is not fulfill
app.get("*", async (req, res) => {
  res.send("404 error").status(404);
});

const server = app.listen(process.env.PORT || 4999, () => {
  console.log("Example app is running → PORT ", process.env.PORT || 4999);
});
server.timeout = 3000;
