"use strict";
const fs = require("fs");
const { sendResponse } = require("./utils");

// file paths for JSON data files
const itemsFilepath = "./data/items.json";
const companiesFilepath = "./data/companies.json";

// importing data of companies and items (products) from JSON files
const companies = require(companiesFilepath);
const items = require(itemsFilepath);
// could also import a JSON file the following way:
// const items = JSON.parse(fs.readFileSync(itemsFilepath));

//handlers

// get all the items from data/items.json
const getAllItems = (req, res) => {
  try {
    // if there is data in the items file
    if (items) {
      // server sends positive response with success message
      const successMsg = `Displaying all items`;
      sendResponse(res, 200, items, successMsg);
    } else {
      // server sends negative response  with error message
      const errMsg = "Oops! No items were found!";
      sendResponse(res, 404, null, errMsg);
    }
  } catch (err) {
    sendResponse(res, 500, req.body, err.message);
  }
};

// get specific item from data/items.json
const getOneItem = (req, res) => {
  // ID of specific item
  const itemId = Number(req.params.id);

  try {
    // check if item with requested ID exists in items array
    const specificItem = items.find((item) => item._id === itemId);

    // if it does...
    if (specificItem) {
      // server sends positive response with success message
      const successMsg = `Found item with ID ${itemId}`;
      sendResponse(res, 200, specificItem, successMsg);
    } else {
      // otherwise, server sends negative respons with error message
      const errMsg = `Could not find item with ID ${itemId}`;
      sendResponse(res, 400, null, errMsg);
    }
  } catch (err) {
    // catch any other errors
    sendResponse(res, 500, req.body, err.message);
  }
};

// decrease stock of specific item from data/items.json
const buyOneItem = (req, res) => {
  // the item id
  const itemId = Number(req.params.id);
  // number of items bought (from request body)
  const { numberBought } = req.body;

  try {
    // find if specific item exists in the items array
    const specificItemIndex = items.findIndex((item) => item._id == itemId);

    // check for errors
    const errMsg =
      specificItemIndex === undefined
        ? `Could not find item with ID ${itemId}. `
        : !numberBought
        ? `No "numberBought" key in the body of the request. `
        : numberBought > items[specificItemIndex].numInStock
        ? `Attempted to buy more items (${numberBought}) than are in stock (${items[specificItemIndex].numInStock}). `
        : "";

    // if no errors
    if (errMsg.length === 0) {
      // create a new items object in which the stock of the item we're looking for is decreased by the numberBought
      const newItemsObj = items.map((item) => {
        return {
          ...item,
          numInStock:
            item._id === itemId
              ? item.numInStock - numberBought
              : item.numInStock,
        };
      });

      // write this new items object to our JSON file (overwriting the existing content). Add 2 spaces so that the resulting JSON is not minified but remains formatted like before.
      fs.writeFileSync(itemsFilepath, JSON.stringify(newItemsObj, null, 2));

      // return a 202 HTTP response and the success message
      const successMsg = `Bought item with ID ${itemId}. ${numberBought} bought.`;
      sendResponse(res, 202, req.body, successMsg);
    } else {
      // if there are errors, return a 400 HTTP response and the error message
      sendResponse(res, 400, null, errMsg);
    }
  } catch (err) {
    // catch any other errors
    sendResponse(res, 500, req.body, err.message);
  }
};

// decrease stock of one or more items from data/items.json
const buyItems = (req, res) => {
  // id of order, and cart array (from request body)
  const { _id: orderId, cart } = req.body;

  try {
    // placeholder error message
    let errMsg = "";

    // check for errors:

    // check if order ID was sent
    if (!orderId) errMsg += "Order ID is missing.";

    // for each item in the user's cart...
    cart.forEach((cartItem) => {
      // check that every item in cart actually exists in the items array.
      const specificItemIndex = items.findIndex(
        (itemsItem) => itemsItem._id == cartItem.itemId
      );
      // if it doesn't, update error message
      if (specificItemIndex === undefined) {
        errMsg += `Could not find item with ID ${cartItem.itemId}. `;
      }

      // test if the request body is missing the quantity of items bought. If it is, update error message
      if (!cartItem.quantity) {
        errMsg += `No "quantity" key for item ${cartItem.itemId} in the body of the request. `;

        // test if trying to buy more quantity than exists in stock. If so, update error message
      } else if (cartItem.quantity > items[specificItemIndex].numInStock) {
        errMsg += `Attempted to buy more items of item ${cartItem.itemId} (${cartItem.quantity}) than are in stock (${items[specificItemIndex].numInStock}). `;
      }
    });

    // if no errors
    if (errMsg.length === 0) {
      // create a new items array in which the stock of every item purchased is decreased by the quantity purchased
      let newItemsArr = [...items];
      // success message placeholder
      let successMsg = "";

      // for each cart item...
      cart.forEach((cartItem) => {
        // update the data in newItemsArr (it will later replace the existing JSON data)
        newItemsArr = newItemsArr.map((item) => {
          // if one of the items matches one in the user's cart...
          if (item._id == cartItem.itemId) {
            // update success message, and modify newItemsArr by decreasing the numInStock property of that item by the quantity that the user bought
            successMsg += `Bought item with ID ${cartItem.itemId} (${cartItem.quantity} bought). `;
            return {
              ...item,
              numInStock: item.numInStock - cartItem.quantity,
            };
          } else {
            // if it's not in the user's cart, leave the item unchanged
            return { ...item };
          }
        });
      });

      // write this new items array to our JSON file (overwriting the existing content). Add 2 spaces so that the resulting JSON is not minified but remains formatted like before.
      fs.writeFileSync(itemsFilepath, JSON.stringify(newItemsArr, null, 2));

      // return a 202 HTTP response and the success message
      sendResponse(res, 202, req.body, successMsg);
    } else {
      // if there are errors, return a 400 HTTP response and the error message
      sendResponse(res, 400, null, errMsg);
    }
  } catch (err) {
    // catch any other errors
    sendResponse(res, 500, req.body, err.message);
  }
};

// get all the companies in data/companies.json
const getAllCompanies = (req, res) => {
  try {
    // if the companies file is not empty...
    if (companies) {
      // server sends success response and message
      const successMsg = `Displaying all companies`;
      sendResponse(res, 200, companies, successMsg);
    } else {
      // server sends error response and message
      const errMsg = "Oops! No companies were found!";
      sendResponse(res, 404, null, errMsg);
    }
  } catch (err) {
    // catch any other errors
    sendResponse(res, 500, req.body, err.message);
  }
};

// get specific company from data/companies.json
const getOneCompany = (req, res) => {
  // the ID of the company being requested
  const companyId = Number(req.params.id);

  try {
    // try finding the company in the companies JSON file, and return its data if found
    const specificCompany = companies.find(
      (company) => company._id === companyId
    );

    // if the company is found...
    if (specificCompany) {
      // server sends success reponse and message
      const successMsg = `Found company with ID ${companyId}`;
      sendResponse(res, 200, specificCompany, successMsg);
    } else {
      // otherwise, server sends error reponse and message
      const errMsg = `Could not find company with ID ${companyId}`;
      sendResponse(res, 400, null, errMsg);
    }
  } catch (err) {
    // catch any other errors
    sendResponse(res, 500, req.body, err.message);
  }
};

// get all categories of items in data/items.json
const getAllItemCategories = (req, res) => {
  // create empty categories array
  let categories = [];

  // add each unique category from items array to categories array
  items.forEach(
    (item) =>
      !categories.includes(item.category) && categories.push(item.category)
  );

  try {
    // if it finds categories...
    if (categories.length > 0) {
      // server sends success reponse and message
      const successMsg = `Displaying all categories`;
      sendResponse(res, 200, categories, successMsg);
    } else {
      // otherwise, server sends error reponse and message
      const errMsg = "Oops! No categories were found!";
      sendResponse(res, 404, null, errMsg);
    }
  } catch (err) {
    // catch any other errors
    sendResponse(res, 500, req.body, err.message);
  }
};

// get all body locations of items in data/items.json
const getAllItemBodyLocations = (req, res) => {
  // create empty body locations array
  let bodyLocations = [];

  // add each unique body location from items array to bodyLocations array
  items.forEach(
    (item) =>
      !bodyLocations.includes(item.body_location) &&
      bodyLocations.push(item.body_location)
  );

  try {
    // if it finds body locations...
    if (bodyLocations.length > 0) {
      // server sends success reponse and message
      const successMsg = `Displaying all body locations`;
      sendResponse(res, 200, bodyLocations, successMsg);
    } else {
      // otherwise, server sends error reponse and message
      const errMsg = "Oops! No body locations were found!";
      sendResponse(res, 404, null, errMsg);
    }
  } catch (err) {
    // catch any other errors
    sendResponse(res, 500, req.body, err.message);
  }
};

// export the handlers
module.exports = {
  getAllItems,
  getOneItem,
  buyOneItem,
  buyItems,
  getAllCompanies,
  getOneCompany,
  getAllItemCategories,
  getAllItemBodyLocations,
};
