import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { downloadImage } from "../helper/supabaseHelper";
import LoadingSpinier from "./LoadingSpiner";

export default function ProductCard({ id, Image, title, price, condition }) {
  const [ProductImage, setProductImage] = useState("");

  useEffect(() => {
    async function getProductImage() {
      const productImage = await downloadImage(Image, "products");
      setProductImage(productImage);
    }

    getProductImage();
  }, [Image]);

  /* convert text to slug */
  function slugify(text) {
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    const to = "aaaaaeeeeeiiiiooooouuuunc------";

    const newText = text
      .split("")
      .map((letter, i) =>
        letter.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
      );

    return newText
      .toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .trim() // Remove whitespace from both sides of a string
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/&/g, "-y-") // Replace & with 'and'
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-"); // Replace multiple - with single -
  }

  return (
    <StyledProductCardBody to={`/product/${id}?title=${slugify(title)}`}>
      <StyledImageContainer>
        {
        ProductImage ?   <Img loading="lazy" alt={title} src={ProductImage} /> : <LoadingSpinier />  
        }
      </StyledImageContainer>
      <div>
        <StyledCondition>{condition}</StyledCondition>
        <StyledProductTitle>{title}</StyledProductTitle>
        <StyledPrice>${price}</StyledPrice>
      </div>
    </StyledProductCardBody>
  );
}

const StyledProductCardBody = styled(Link)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 300px;
  text-decoration: none;
  margin: 1rem;
  padding: 1rem;
  border-radius: 9px;
  background: #ffffff;
  box-shadow: 5px 5px 11px #e6e6e6, -5px -5px 11px #ffffff;
`;
const StyledImageContainer = styled.div`
  /*  height: 100%; */
`;
const Img = styled.img`
  display: flex;
  flex-direction: column;
  object-fit: cover;
  width: 100%;
`;
const StyledCondition = styled.span`
  background-color: black;
  padding: 0.5rem;
  color: whitesmoke;
`;
const StyledProductTitle = styled.h2`
  color: black;
  text-transform: capitalize;
  margin: 1rem 0;
  font-size: 1.1rem;
`;
const StyledPrice = styled.h2`
  color: #2bd11c;
  font-weight: bold;
`;
