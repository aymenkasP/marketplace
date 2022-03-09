import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import LoadingSpinier from "../components/LoadingSpiner";
import {
  getProductsByUserId,
  getProfile,
  updateAvatar,
} from "../helper/supabaseHelper";
import { supabase } from "../supabase/supabaseClient";
import { useParams } from "react-router-dom";
import ProductsSection from "../components/ProductsSection";

export default function Profile() {
  
  const [Profile, setProfile] = useState(null);
  const [ProfileProducts, setProfileProducts] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const params = useParams();
  let navigate = useNavigate();

  const user = supabase.auth.user();
  const isOwner = user?.id === params.id;

  function ScrollToTheTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    async function getProfileData() {
      /* Get The profile Data */
      const profile = await getProfile(params.id);

      if (profile) {
        setProfile(profile);
        setAvatarUrl(profile.avatar_url);

        /* Profile Products */
        const profileProducts = await getProductsByUserId(params.id);
        setProfileProducts(profileProducts);
      } else {
        navigate("/profilesittings");
      }
    }

    getProfileData();
    ScrollToTheTop();
  }, [params.id, navigate]);

  if (!Profile) return <LoadingSpinier />;

  return (
    <>
      <StyledProfilePageContainer>
        <StyledProfileInfoContainer>
          <ProfileOwnerImg
            avatar_url={avatar_url}
            setAvatarUrl={setAvatarUrl}
            isOwner={isOwner}
          />
          <TheOwnerInfo Profile={Profile} />
          {isOwner && <ProfileBtn />}
        </StyledProfileInfoContainer>

        <ProductsSection Data={ProfileProducts} />
      </StyledProfilePageContainer>
    </>
  );
}

/* Components */

function ProfileOwnerImg(props) {
  return (
    <StyledImageContainer>
      <Avatar
        url={props.avatar_url}
        size="1000px"
        isOwner={props.isOwner}
        onUpload={(url) => {
          updateAvatar(url);
          props.setAvatarUrl(url);
        }}
      />
    </StyledImageContainer>
  );
}

function TheOwnerInfo(props) {
  return (
    <div>
      <UserName>{props.Profile.username}</UserName>

      <UserInfo>
        <p>
          <span>phone:</span> {props.Profile?.PhoneNumber}
        </p>
        <p>
          <span>email:</span> {props.Profile?.email}
        </p>
      </UserInfo>
    </div>
  );
}

function ProfileBtn() {
  return (
    <div>
      <BtnLink to="/Profilesittings">Update Profile</BtnLink>
      <BtnLink to="/create-product">create product</BtnLink>
    </div>
  );
}

/* Styles */

const StyledProfilePageContainer = styled.div`
  width: 80vw;
  margin: auto;
`;
const StyledProfileInfoContainer = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 5px 5px 10px #dbdbdb, -5px -5px 10px #ffffff;

  @media (max-width: 849px) {
    width: 70%;
  }
  @media (max-width: 371px) {
    width: 100%;
    padding: 0;
  }
`;
const UserName = styled.h1`
  margin: 0;
`;
const UserInfo = styled.div`
  p {
    span {
      font-weight: bold;
    }
  }
`;
const StyledImageContainer = styled.div`
  max-width: 200px;
`;
const BtnLink = styled(Link)`
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #0f1111;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  line-height: 29px;
  padding: 0 10px 0 11px;
  margin: 0.5rem;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 150px;

  &:hover {
    background-color: #f7fafa;
  }

  &:focus {
    border-color: #008296;
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    outline: 0;
  }
`;
