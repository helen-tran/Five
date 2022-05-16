"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  getAllItems,
  getOneItem,
  buyItems,
  buyOneItem,
  getAllCompanies,
  getOneCompany,
  getAllItemCategories,
  getAllItemBodyLocations,
  getAllInfo,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints
  .get("/items", getAllItems)
  .get("/items/:id", getOneItem)
  .put("/items/buy", buyItems)
  .put("/items/buy/:id", buyOneItem) // unused
  .get("/companies", getAllCompanies)
  .get("/companies/:id", getOneCompany)
  .get("/categories", getAllItemCategories) // unused
  .get("/body-locations", getAllItemBodyLocations) // unused
  .get("/allInfo", getAllInfo)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
