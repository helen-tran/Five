import React, { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ShopDataContext } from "./ShopDataContext";
import { CircularProgress } from "@mui/material";
import useProductDetails from "../hooks/use-product-details.hook.js";

const ProductDetails = () => {
  const { dispatch } = useContext(ShopDataContext);
  const { id } = useParams(); /* GET the unique product id for the fetchProductDetails API call */
  const [productDetails] = useProductDetails(id); /* Return product details from API call */

  return productDetails ? (
    <section className="_50" style={{ height: "100vh" }}>
      <ImageBox className="column product__details--left">
        <div>
          <ProductImage src={productDetails.imageSrc} />
        </div>
      </ImageBox>
      <div className="column product__details--right">
        <CompanyDisp>{productDetails.companyName}</CompanyDisp>
        <ProductNameDisp>{productDetails.name}</ProductNameDisp>
        <PriceDisp>{productDetails.price} </PriceDisp>
        <InStock>In stock: {productDetails.numInStock}</InStock>
        <div style={{ borderBottom: "1px solid black", marginTop: "20px" }} />
        <ButtonDisp>
          {productDetails.numInStock === 0 ? (
            <OutOfStockBtn>OUT OF STOCK</OutOfStockBtn>
          ) : (
            <AddToCartBtn
              /* Pass product details to the reducer payload when item is added to cart */
              onClick={() =>
                dispatch({
                  type: "add-item-to-cart",
                  item: productDetails,
                })
              }
            >
              ADD TO CART
            </AddToCartBtn>
          )}
        </ButtonDisp>
        <div style={{ fontFamily: "Roboto" }}>
          For more information, please visit the company's{" "}
          <a href={productDetails.companyUrl} style={{ color: "black" }}>
            website
          </a>
        </div>
      </div>
    </section>
  ) : (
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>
  );
};

const ImageBox = styled.div``;

const ProductImage = styled.img`
  @media (max-width: 520px) {
    width: 100%;
  } ;
`;

const CompanyDisp = styled.div`
  font-weight: bold;
  font-size: 40px;
  text-transform: uppercase;
`;

const ProductNameDisp = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
`;

const PriceDisp = styled(ProductNameDisp)`
  padding-bottom: 15px;
  font-size: 40px;
`;

const InStock = styled.div`
  font-size: 12px;
  padding-bottom: 10px;
`;

const ButtonDisp = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const OutOfStockBtn = styled.button`
  width: 100%;
  height: 50px;
  background-color: grey;
  color: white;
  border-radius: 5px;
  border: none;
`;

const AddToCartBtn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  border: none;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export default ProductDetails;
