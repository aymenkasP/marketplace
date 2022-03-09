import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import LoadingSpinier from "../components/LoadingSpiner";
import Notification from "../components/Notification";
import {
  getProfile,
  updateAvatar,
  updateProfile,
} from "../helper/supabaseHelper";
import { supabase } from "../supabase/supabaseClient";

function ProfileImg(props) {
  return (
    <StyledImageContainer>
      <Avatar
        url={props.avatar_url}
        isOwner
        className="img"
        onUpload={(url) => {
          updateAvatar(url);
          props.setAvatarUrl(url);
        }}
      />
    </StyledImageContainer>
  );
}

export default function ProfileSittings() {
  const [loading, setLoading] = useState(false);

  const [avatar_url, setAvatarUrl] = useState(null);
  const [username, setUsername] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState(0);

  const [notification, setNotification] = useState(null);

  const user = supabase.auth.user();

  useEffect(() => {
    async function getProfileInfo() {
      setLoading(true)
      const userInfo = await getProfile(user.id);

      if (userInfo) {
        setUsername(userInfo.username);
        setAvatarUrl(userInfo.avatar_url);
        setPhoneNumber(userInfo.PhoneNumber);
      }

      setLoading(false)
    }
    getProfileInfo();
  }, [user]);

  /* Check if the phone number valid */
  function phonenumber(inputtxt) {
    let phoneno = /^\(?([0-9]{2})\)?[ ]?([0-9]{3})?[ ]?([0-9]{4})$/;

    if (inputtxt.toString().match(phoneno)) {
      return true;
    } else {
      alert("your phone number is invalid");
      return false;
    }
  }

  /* Update The Profile */
  async function onUpdate() {
    const ValidateUsername = username.length > 1 && isNaN(parseInt(username));
    const ValidatePhoneNumber = phonenumber(PhoneNumber);

    if (!ValidateUsername) return alert("your username is invalid");

    if (ValidateUsername && ValidatePhoneNumber) {
      setLoading(true);
      const update = await updateProfile(username, avatar_url, PhoneNumber);
      setLoading(false);
      setNotification(update);
    }
  }

  if (loading) return <LoadingSpinier />;

  return (
    <>
      <StyledProfileSittingsContainer>
        <Title />
        {notification && <Notification Message={notification} />}
          <StyledInfoContainer>
            <ProfileImg
              avatar_url={avatar_url}
              setAvatarUrl={setAvatarUrl}
            />

            <div className="grid">
              <Input
                value={username}
                setValue={setUsername}
                label="username"
                type="text"
              />
              <Input
                value={PhoneNumber}
                setValue={setPhoneNumber}
                label="phone"
                type="tel"
              />
              <small>Format: 123 456 789</small>
            </div>

            <Button onClick={() => onUpdate()}>
              {loading ? "Loading" : "update"}
            </Button>
          </StyledInfoContainer>
      </StyledProfileSittingsContainer>
    </>
  );
}

/* Components */

function Title() {
  return (
    <>
      <div>
        <h1>Personal Details</h1>
      </div>
    </>
  );
}



/* Styles */

const StyledProfileSittingsContainer = styled.div`
  display: grid;
  gap: 1rem;
  place-items: center;
  width: 80vw;
  margin: auto;
  margin-top: 1rem;
`;

const StyledInfoContainer = styled.div`
  padding: 1rem;

  .grid {
    display: grid;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  background: #ffffff;
  box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
`;

const StyledImageContainer = styled.div`
  max-width: 300px;
  .img {
    width: 100%;
  }
`;
const Button = styled.div`
  background: black;
  color: white;
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;
  padding: 0.7rem 1.7rem;
`;
