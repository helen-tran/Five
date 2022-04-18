import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export const ShopDataContext = createContext();

// the reducer
const reducer = (cartItems, action) => {
  // make a copy of the existing cart array to modify
  let newCartItemsArr = [...cartItems];
  // if an item is being passed through into reducer, check if the item to be added or removed already exists in the cart array, and if so, find its index
  const indexOfItem = action.item
    ? cartItems.findIndex((cartItem) => cartItem._id === action.item._id)
    : null;

  switch (action.type) {
    // try to add one stock of an item to the cart
    case "add-item-to-cart":
      if (indexOfItem === -1 || indexOfItem === undefined) {
        // if item is not already in the cart, add it in, with a quantity of 1
        newCartItemsArr.push({ ...action.item, quantity: 1 });
      } else {
        // if it IS already in the cart,check if user is trying to buy more than exist
        if (
          newCartItemsArr[indexOfItem].quantity >=
          newCartItemsArr[indexOfItem].numInStock
        ) {
          // if trying to buy more than exist, show an alert
          alert(
            `Another item ${action.item._id} cannot be added to cart, as you are trying to purchase more than existing stock.`
          );
        } else {
          // if not, increase its quantity by 1
          newCartItemsArr[indexOfItem].quantity =
            newCartItemsArr[indexOfItem].quantity + 1;
        }
      }
      // return the modified cart array
      return newCartItemsArr;

    // try to remove one stock of an item from the cart
    case "remove-item-from-cart":

      if (indexOfItem === -1) {
        // if item is not already in the cart, you can't remove it, so throw an error
        throw new Error(
          `Item ${action.item._id} is not in the cart, so it can't be removed.`
        );
      } else {
        // if it IS already in the cart, check if quantity is above 1
        if (newCartItemsArr[indexOfItem].quantity > 1) {
          // if so, decrease quantity by one
          newCartItemsArr[indexOfItem].quantity--;
        } else {
          // otherwise, delete the item from cartItems
          newCartItemsArr = newCartItemsArr.filter(
            (cartItem) => cartItem._id !== action.item._id
          );
        }
      }
      // return the modified cart array
      return newCartItemsArr;

    // try to remove all stock of an item from the cart
    case "remove-all-of-one-item-from-cart":
      if (indexOfItem === -1) {
        // if item is not already in the cart, you can't remove it, so throw an error
        throw new Error(
          `Item ${action.item._id} is not in the cart, so it can't be removed.`
        );
      } else {
        // if it IS already in the cart, delete the item from cartItems
        newCartItemsArr = newCartItemsArr.filter(
          (cartItem) => cartItem._id !== action.item._id
        );
      }
      // return the modified cart array
      return newCartItemsArr;

    // remove all items from the cart
    case "clear-cart":
      // return an empty array to clear the cart
      return [];
    default:
      // if action type is unrecognized, display error
      throw new Error("Unrecognized action");
  }
};

// context provider
export const ShopDataProvider = ({ children }) => {
  // the cart items (kept in state) and dispatch
  const [cartItems, dispatch] = useReducer(reducer, []);

  // calculate total number of cart items, tallying up the quantities of each item in cart, or 0 if there are none
  const getNumItemsInCart = (cartItems) => {
    return cartItems.length > 0
      ? cartItems
          .map((item) => item.quantity)
          .reduce((acc, curr) => acc + curr, 0)
      : 0;
  };

  // calculate total cost of all the cart items
  const getTotalCostOfCart = (cartItems) => {
    return (
      Math.round(
        cartItems
          .map((item) => Number((item.price.split("$")[1]).replace(/,/gi, '')) * item.quantity)
          .reduce((acc, curr) => acc + curr, 0) * 100
      ) / 100
    );
  };

  // create special cart object containing only the information needed to send to server, for the PUT request to /items/buy
  const makeCartObjForServer = (cartItems) => {
    return cartItems.map((item) => {
      return { itemId: item._id, quantity: item.quantity };
    });
  };

  // purchase items in the cart (send properly-formatted PUT request to items/buy)
  const handlePurchase = () => {
    // create special cart object containing only the information needed to send to server
    const cartForServer = makeCartObjForServer(cartItems);

    fetch(`/items/buy`, {
      method: "PUT",
      body: JSON.stringify({
        _id: uuidv4(),
        cart: cartForServer,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {

        const { status, message, data } = json;

        // check that the request got successfully through to server
        if (status === 202) {
          // if so, clear the cart
          dispatch({
            type: "clear-cart",
          });
          // Display confirmation message that the items were purchased.
          alert(`Successfully purchased items. Your order ID is ${data._id}`);
        } else {
          // if it didn't go through, show an error.
          throw new Error({ status, message, data });
        }
      });
  };

  return (
    <ShopDataContext.Provider
      value={{
        cartItems,
        dispatch,
        getNumItemsInCart,
        getTotalCostOfCart,
        makeCartObjForServer,
        handlePurchase,
      }}
    >
      {children}
    </ShopDataContext.Provider>
  );
};
