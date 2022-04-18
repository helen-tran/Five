import React, { useContext } from "react";
import styled from "styled-components";
import { AiOutlineShopping } from "react-icons/ai";
import { ShopDataContext } from "./ShopDataContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { cartItems, getNumItemsInCart } = useContext(ShopDataContext);

  const numItemsInCart = getNumItemsInCart(cartItems);

  return (
    <HeaderElement>
      <Link to="/">
        <h1>Five</h1>
      </Link>
      <Menu>
        <Link to="/products" className="product_button">
          Products
        </Link>
        <Link to="/cart" className="cart_button">
          <AiOutlineShopping />
          {/* By applying a ternary the cart count only shows if an item is added */}
          {numItemsInCart > 0 ? (
            <ItemCounter>{numItemsInCart}</ItemCounter>
          ) : (
            <></>
          )}
        </Link>
      </Menu>
    </HeaderElement>
  );
};

const HeaderElement = styled.header`
  align-items: center;
  padding: 20px 30px;
  display: flex;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  h1 {
    text-transform: uppercase;
    font-size: 50px;
  }
`;

const Menu = styled.div`
  a.product_button {
    font-size: var(--font-size-small);
    text-decoration: none;
    color: #000;
  }
  align-items: center;
  justify-content: flex-end;
  display: flex;
  flex: 1;
  .cart_button {
    position: relative;
    svg {
      color: #000;
      font-size: 24px;
      margin-left: 20px;
    }
  }
`;

const ItemCounter = styled.span`
  position: absolute;
  right: -8px;
  color: #000;
  width: 20px;
  border-radius: 50%;
  top: -4px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #757d8a;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 1px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

export default Header;
