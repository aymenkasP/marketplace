import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import {
  downloadImage,
  getProductById,
  getProfile,
} from "../helper/supabaseHelper";
import LoadingSpiner from "../components/LoadingSpiner";
import parse from "html-react-parser";

import styled from "styled-components";
import Chat from "../Chat/Chat";

export default function ProductPage() {
  const [ProductData, setProductData] = useState(false);
  const [UserData, setUserData] = useState([]);
  const [ProductImage, setProductImage] = useState(null);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const session = supabase.auth.session();
  const params = useParams();
  const navigate = useNavigate();
  const user = ProductData[0]?.user;

  useEffect(() => {
    async function getProductPageInfo() {
      /* Get The Product By Id */
      const product = await getProductById(params.id);
      setProductData(product);

      /* Get The Product Owner */
      const profile = await getProfile(product[0]?.user);
      setUserData(profile);

      /* Get The product Image from supabase */
      const productImage = await downloadImage(
        product[0]?.ProductImagePath,
        "products"
      );
      setProductImage(productImage);
    }

    getProductPageInfo();
  }, [params, user]);

  function OnContactHandler() {
    session ? setIsChatOpen(true) : alert("Please login to contact the seller");
  }

  if (!ProductData) return <LoadingSpiner />;

  return (
    <>
      <StyledContainer>
        <StyledTheProduct>
          <TheProductImgImage
            ProductData={ProductData}
            ProductImage={ProductImage}
          />

          <StyledProductDetails>
            <TheProductDetails ProductData={ProductData} />

            <StyledTheOwner>
              <OwnerDetails
                ProductData={ProductData}
                UserData={UserData}
                user={user}
              />

              <TheProductActionsBtn
                session={session}
                id={params.id}
                navigate={navigate}
                user={user}
                OnContactHandler={OnContactHandler}
              />

              {isChatOpen && (
                <TheChat
                  TheOwnerEmail={ProductData?.[0]?.email}
                />
              )}

              {!session && (
                <p>
                  <Link to="/login">Login</Link> or{" "}
                  <Link to="/signup">signup</Link> to contact the seller
                </p>
              )}
            </StyledTheOwner>
          </StyledProductDetails>
        </StyledTheProduct>
      </StyledContainer>
    </>
  );
}

/* Components  */

function TheProductImgImage({ ProductImage, ProductData }) {
  return (
    <StyledImageContainer>
      <img src={ProductImage} alt={ProductData?.[0]?.Title} />
    </StyledImageContainer>
  );
}

function TheProductDetails({ ProductData }) {
  return (
    <div>
      <h1>{ProductData?.[0]?.Title}</h1>
      <p className="subtitle">
        <span>{ProductData?.[0]?.Category}</span>
        {" / "}
        <span>{ProductData?.[0]?.Condition}</span>
      </p>

      <p className="price">
        Price: <span>${ProductData?.[0]?.Price}</span>
      </p>

      <p className="Bold">
        Quantity: <span>{ProductData?.[0]?.Quantity}</span>
      </p>
      <p className="Bold">
        Email : <span>{ProductData?.[0]?.email}</span>
      </p>
      <p className="Bold">
        Phone : <span>{ProductData?.[0]?.PhoneNumber}</span>
      </p>

      <div className="description">{parse(ProductData?.[0]?.Description)}</div>
    </div>
  );
}

function OwnerDetails({ user, UserData, ProductData }) {
  return (
    <div className="Header">
      <div>
        <Link to={`/profile/${user}`}>Visit the {UserData.username} Store</Link>
        <p>
          Email : <span>{ProductData?.[0]?.email}</span>
        </p>
        <p>
          Phone : <span>{UserData.PhoneNumber}</span>
        </p>
      </div>
    </div>
  );
}

function TheChat({ TheOwnerEmail }) {
  return (
    <StyledChatContainer>
      <Chat
        sellerUsername={TheOwnerEmail}
     
      />
    </StyledChatContainer>
  );
}

function TheProductActionsBtn({
  id,
  OnContactHandler,
  navigate,
  user,
  session,
}) {
  return (
    <div>
      {user === session?.user?.id ? (
        <Btn onClick={() => navigate(`/product/edit/${id}`)}>Edit</Btn>
      ) : (
        <Btn onClick={() => OnContactHandler()}>Contact</Btn>
      )}
    </div>
  );
}

/* Styles  */

const StyledContainer = styled.div`
  padding-top: 2rem;
  width: 90vw;
  margin: auto;
`;

const StyledTheProduct = styled.div`
  width: 90%;
  margin: auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap:1rem;

  @media (max-width: 769px) {
    flex-direction: column;
  }

  background: #ffffff;
  box-shadow: 5px 5px 10px #dbdbdb, -5px -5px 10px #ffffff;
`;

const StyledImageContainer = styled.div`
  flex: 0.6;
  img {
    position: sticky;
    top: 5rem;
    width: 100%;
  }
`;

const StyledProductDetails = styled.div`
  flex: 0.4;
  margin: 0 1rem 0 1rem;

  h1,
  .subtitle {
    margin: 0;
  }

  .subtitle {
    color: #565959;
    margin-bottom: 1rem;
  }

  .price {
    font-weight: bold;
    margin: 0;
    color: #565959;
    span {
      color: #2bd11c;
    }
  }
  .Bold {
    margin: 0;
    color: #565959;

    span {
      color: black;
      font-weight: 500;
    }
  }

  .description {
    margin-top: 1rem;
  }
`;

const StyledTheOwner = styled.div`
  margin-top: 1.5rem;
  .Header {
    a {
      color: #007185;
    }
  }
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  margin: 1rem 0 0 0rem;

  background-color: black;
  border: 1px solid #13aa52;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 10px 30px;
  }
`;

const StyledChatContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  width: 50vw;
  height: 60%;
  margin: auto;

  @media (max-width: 651px) {
    width: 80vw;
  }
`;
