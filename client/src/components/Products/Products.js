import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SingleProduct from "./SingleProduct";
import { CircularProgress } from "@mui/material";

const Products = () => {
  // setting state
  const [data, setData] = useState([]);

  //Make two calls to API
  useEffect(() => {
    fetch(`/allInfo`)
      .then((res) => res.json())
      .then((data) => {
        //Save items to useState
        setData(data.data[0]);
      });
  }, []);

  // alphabetical order
  const ascending = () => {
    const up = data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setData(up);
  };

  return (
    <PageWrapper>
      {data.length > 0 ? (
        <div className="grid">
          {data.map((product) => {
            const productName = product.productName;
            const price = product.price;
            const img = product.imageSrc;
            const productId = product.productId;
            const companyName = product.name;
            return (
              <SingleProduct
                key={productId}
                productName={productName}
                price={price}
                img={img}
                companyName={companyName}
                productId={productId}
              />
            );
          })}
        </div>
      ) : (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      )}
    </PageWrapper>
  );
};
const PageWrapper = styled.div`
  text-transform: uppercase;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export default Products;
