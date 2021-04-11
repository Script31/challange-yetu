const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config/db");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(db.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }
  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
