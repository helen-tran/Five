import React, { useContext } from "react";
import styled from "styled-components";
import { ShopDataContext } from "./ShopDataContext";

const Cart = () => {
  const { cartItems, dispatch, getTotalCostOfCart, handlePurchase } =
    useContext(ShopDataContext);

  // calculate total cost of all the cart items
  const totalCost = getTotalCostOfCart(cartItems);

  return (
    <section className="_66_33 cart__page">
      <div className="column_left">
        <CartH1>YOUR CART</CartH1>
        {cartItems.map((item, key) => {
          // an object of the item info, properly organized to send to dispatch. Find the right object inside cartItems. Pass everything except the "quantity" property
          let itemForDispatch = { ...item };
          delete itemForDispatch.quantity;

          return (
            <Card key={key}>
              <div className="grid cart_page">
                <div className="grid__left">
                  <ProductImage
                    className="product__image"
                    src={item.imageSrc}
                  />
                </div>
                <div className="grid__right">
                  <Company>{item.companyName}</Company>
                  <ProductName>{item.name}</ProductName>
                  <Price>{item.price}</Price>
                  <CartBottom>
                    <div>
                      <Minus
                        onClick={() =>
                          dispatch({
                            type: "remove-item-from-cart",
                            item: itemForDispatch,
                          })
                        }
                      >
                        -
                      </Minus>{" "}
                      {item.quantity}{" "}
                      <Plus
                        onClick={() => {
                          dispatch({
                            type: "add-item-to-cart",
                            item: itemForDispatch,
                          });
                        }}
                      >
                        +
                      </Plus>
                    </div>
                    <Remove
                      onClick={() =>
                        dispatch({
                          type: "remove-all-of-one-item-from-cart",
                          item: itemForDispatch,
                        })
                      }
                    >
                      Remove
                    </Remove>
                  </CartBottom>
                </div>
              </div>
              <hr></hr>
            </Card>
          );
        })}
      </div>
      <div className="column_right cart__page">
        <TotalCost>
          <div>Total cost:&nbsp;</div>
          <div>${totalCost.toFixed(2)}</div>
        </TotalCost>
        <Purchase onClick={() => handlePurchase()}>PURCHASE</Purchase>
      </div>
    </section>
  );
};

const Company = styled.div`
  font-size: var(--font-size-medium);
`;

const ProductName = styled.div`
  font-size: var(--font-size-small);
`;
const Price = styled.div`
  font-size: var(--font-size-medium);
  margin-top: 10px;
`;

const Purchase = styled.button`
  color: white;
  background: black;
  width: 100%;
  font-size: var(--font-size-medium);
  border-radius: 4px;
  border: none;
  font-family: "Oswald", "Roboto", sans-serif;
  padding: 10px 0;
  cursor: pointer;
`;

const TotalCost = styled.div`
  display: flex;
  white-space: nowrap;
  justify-content: space-between;
  text-decoration: bold;
  font-size: var(--font-size-medium);
  margin-bottom: 30px;
`;

const CartBottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-small);
  margin-top: 20px;
`;

const Minus = styled.button`
  background: white;
  border: none;
  cursor: pointer;
`;

const Plus = styled.button`
  background: white;
  border: none;
  cursor: pointer;
`;

const Remove = styled.button`
  background: white;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;

const ProductImage = styled.img``;

const CartH1 = styled.h1`
  margin-bottom: 30px;
`;

const Card = styled.div`
  margin-bottom: 30px;
`;

export default Cart;
