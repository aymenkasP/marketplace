import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import styled from "styled-components";
import AccountAvatar from "../components/Navbar/AccountAvatar";
import AccountMessages from "../components/Navbar/AccountMessages";
import LogoutBtn from "./Navbar/LogoutBtn";
import BrandLogo from "./Navbar/BrandLogo";
import NavBtnSignLogin from "./Navbar/NavBtnSignLogin";

export default function Nav() {
  let navigate = useNavigate();
  const session = supabase.auth.session();

  async function handelLogout() {
     await supabase.auth.signOut();
    navigate(`/login`);
  }

  return (
    <>
      <StyledNavBar>
        <StyledNavContainer>
          <BrandLogo />

          <StyledNavBtnContainer>
            {session ? (
              <div className="IconsContainer">
                <AccountMessages />
                <AccountAvatar userId={session.user.id} />
                <LogoutBtn handelLogout={handelLogout} />
              </div>
            ) : (
              <NavBtnSignLogin handelLogout={handelLogout} />
            )}
          </StyledNavBtnContainer>
        </StyledNavContainer>
      </StyledNavBar>
    </>
  );
}

const StyledNavBar = styled.header`
  padding-top: 0.5rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 99999999;
  background-color: white;
`;
const StyledNavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  margin: auto;
  padding: 1rem;
`;

const StyledNavBtnContainer = styled.div`
  .IconsContainer {
    display: flex;
    gap: 1rem;
  }
`;
