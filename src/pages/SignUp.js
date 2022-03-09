import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import LoginSignup from "../components/LoginSignup/LoginSignup";
import { createUserChatAccount } from "../helper/ChatHalper";
import { supabase } from "../supabase/supabaseClient";
import Notification from "../components/Notification";

export default function SignUp() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [User, setUser] = useState(false);
  const [error, setError] = useState("");

  const [Loading, setLoading] = useState(false);

  const isPasswordMatched = Password === ConfirmPassword;


  async function onCreateAccount() {

    if (
      Email.length &&
      isPasswordMatched
    ) {
      setLoading(true)
      const { user, error } = await supabase.auth.signUp({
        email: Email,
        password: Password,
      });
      setUser(user);
      setError(error);

     createUserChatAccount(Email, user.id);
      setLoading(false)
    }
  }

  return (
    <>
      <LoginSignup>
        <h1>Sign up</h1>
        {User && < Notification Message="Please confirm your email" />}
        {/* error messages */}
        {error && <ErrorMessage message={error.message} />}
        {!isPasswordMatched && (
          <ErrorMessage message="the password is not matched" />
        )}

       
        <Input
         value={Email}
         setValue={setEmail}
         label="email"
         type="email" 
         />
       
        <Input
          value={Password}
          setValue={setPassword}
          label="password"
          type="password"
        />
        <Input
          value={ConfirmPassword}
          setValue={setConfirmPassword}
          label="confirm password"
          type="password"
        />

        <CreateAccountButton
          createAccount={onCreateAccount}
          disabled={isPasswordMatched}
          Loading={Loading}
        />

        <AlreadyHaveAnAccount />
      </LoginSignup>
    </>
  );
}

function CreateAccountButton({ createAccount, disabled , Loading }) {
  return (
    <button
      type="submit"
      disabled={!disabled}
      onClick={() => createAccount()}
    >
      {
      Loading ? "Loading" :  "Create Account" 

      }
    </button>
  );

   
}

function ErrorMessage({ message }) {
  return (
    <>
      <div className="alert">
        <p>{message}</p>
      </div>
    </>
  );
}

function AlreadyHaveAnAccount() {
  return (
    <div >
      Already have an account?
      <Link  to="/login">
        Log in
      </Link>
    </div>
  );
}
