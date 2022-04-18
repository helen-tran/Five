import { useState, useEffect } from "react";

//custom hook for relevant product details, company name and website
const useProductDetails = (productId) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // fetch company info
    const fetchCompanyDetails = async (companyID) => {
      const response = await fetch(`/companies/${companyID}`);
      const resJSON = await response.json();
      return resJSON.data;
    };

    // fetch product info
    const fetchProductDetails = async (productId) => {
      const response = await fetch(`/items/${productId}`);
      const resJSON = await response.json();
      const product = resJSON.data;

      // fetch company info for the product
      const company = await fetchCompanyDetails(product.companyId);

      // create a new object that adds fields for the company name and company URL
      const productDetailsObj = {
        ...product,
        companyName: company.name,
        companyUrl: company.url,
      };

      // update the product details
      setProductDetails(productDetailsObj);
    };

    // if there is a productId, run the fetchProductDetails function
    if (productId) {
      fetchProductDetails(productId);
    }

    // cleanup
    return () => {
      setProductDetails(null);
    };
  }, [productId]);

  return [productDetails, setProductDetails];
};

export default useProductDetails;
