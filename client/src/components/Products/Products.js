import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SingleProduct from "./SingleProduct";
import { CircularProgress } from "@mui/material";

const Products = () => {
  // setting state
  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState([]);
  let productsArray = [];

  //Make two calls to API
  useEffect(() => {
    fetch(`/items`)
      .then((res) => res.json())
      .then((data) => {
        //Save items to useState
        setItems(data.data);

        //The data from both API calls are dependent on one another for populating the product cards therefore the calls need to be made synchronous
        return fetch(`/companies`)
          .then((res) => res.json())
          .then((data) => {
            //Save companies to useState
            setCompanies(data.data);
          });
      });
  }, []);

  if (items.length > 0 && companies.length > 0) {
    // changing key name ("name") inside items to "productName" so it won't override with the companies "name" data. Since the keys are the same
    const itemsNameChange = items.map(({ name: productName, ...rest }) => ({
      productName,
      ...rest,
    }));
    // changing key name (_id) inside items to "productId" so it won't override with companies "_id" data.
    const itemsProducts = itemsNameChange.map(
      ({ _id: productId, ...rest }) => ({
        productId,
        ...rest,
      })
    );
    // changing key name (_id) inside items to "companyId" so the data can cross reference with the data in itemsProducts
    const companyArray = companies.map(({ _id: companyId, ...rest }) => ({
      companyId,
      ...rest,
    }));

    // merging items to the corresponding companies data set
    const newArray = itemsProducts.map((item) => ({
      ...item,
      ...companyArray.find((company) => company.companyId === item.companyId),
    }));

    productsArray.push(newArray);
    // alphabetical order
    newArray.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    productsArray = newArray;
  }

  return (
    <PageWrapper>
      <section>
        <div className="column">
          <PageTitle>Products</PageTitle>
        </div>
      </section>
      {productsArray.length > 0 ? (
        <div className="grid">
          {productsArray.map((product) => {
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
const PageTitle = styled.h1`
  font-size: var(--font-size-big);
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export default Products;
