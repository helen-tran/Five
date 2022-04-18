import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SingleProduct = ({ productName, price, img, productId, companyName }) => {
  return (
    <div className="column">
      <Wrapper to={`/items/${productId}`}>
        <Img src={img} />
        <InfoWrapper>
          <Title>{companyName}</Title>
          <ProductName>{productName}</ProductName>
          <Price>{price}</Price>
        </InfoWrapper>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled(NavLink)`
  display: flex;
  height: 100%;
  flex-direction: column;
  text-decoration: none;
  color: black;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  margin-top: auto;
  width: 100%;
`;
const Title = styled.h2`
  font-size: var(--font-size-medium);
  /* if screen is smaller than this */
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: var(--font-size-small);
  }
`;
const Img = styled.img`
  font-size: var(--font-size-medium);
  margin-bottom: 30px;
`;
const ProductName = styled.p`
  font-size: var(--font-size-small);
  @media (max-width: 1024px) {
    font-size: 16px;
  } ;
`;
const Price = styled.h2`
  font-size: var(--font-size-medium);
  margin-top: 10px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: var(--font-size-small);
  }
`;
export default SingleProduct;
