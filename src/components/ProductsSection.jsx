import React from "react";
import styled from "styled-components";
import LoadingSpinier from "./LoadingSpiner";
import ProductCard from "./ProductCard";

export default function ProductsSection({ Data }) {
  
  if (Data === null) return <LoadingSpinier />;
  if (Data?.length === 0) return <p>No products</p>;

  return (
    <div>
      <StyledProductsContainer>
        <>
          {Data?.map((item) => (
            <ProductCard
              id={item.id}
              Image={item.ProductImagePath}
              title={item.Title}
              price={item.Price}
              condition={item.Condition}
              key={item.id}
            />
          ))}
        </>
      </StyledProductsContainer>
    </div>
  );
}

const StyledProductsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
