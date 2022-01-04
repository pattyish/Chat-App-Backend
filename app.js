const express = require("express");
const { model } = require("mongoose");
const errorHandlers = require("./handlers/errorHandlers");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setupo error Handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV == "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}
module.exports = app;