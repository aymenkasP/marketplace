import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import LoginSignup from "../components/LoginSignup/LoginSignup";
import { supabase } from "../supabase/supabaseClient";
import validator from "validator";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [ValidateEmail, setValidateEmail] = useState(null);
  const [Password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorHandler, setError] = useState("");

  

  const buttonDisabled = (Email.length > 0) & (Password.length > 0) ;
  let navigate = useNavigate();

  
  async function handleLogin() {

    if (validator.isEmail(Email) ) {
      try {
        setLoading(true);
        const { user, error } = await supabase.auth.signIn({
          email: Email,
          password: Password,
        });
        if (error) {
          setError(error);
        }
        setLoading(false);
  
        if (user) {
          navigate(`/home`);
        }
      } catch (error) {
        alert(error.error_description || error.message);
      }
    } else {
      setValidateEmail(false)
    }
    
  }

  return (
    <>
      <LoginSignup>
        <h1>Login</h1>

        {errorHandler && <ErrorMessage message={errorHandler.message} />}
        { ValidateEmail === false && <ErrorMessage message="Enter valid Email!" />}

        <Input value={Email} setValue={setEmail} label="email" type="email" />
        <Input
          value={Password}
          setValue={setPassword}
          label="password"
          type="password"
        />

        <LoginButton
          Login={handleLogin}
          disabled={buttonDisabled}
          loading={loading}
        />

        <DontHaveAnAccount />
      </LoginSignup>
    </>
  );
}

function LoginButton({ Login, disabled, loading }) {
  return (
    <button type="submit" disabled={!disabled} onClick={() => Login()}>
      {loading ? "loading" : "Login"}
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

function DontHaveAnAccount() {
  return (
    <div className="dont-have-an-account">
      Dont have an account?
      <Link to="/signup">Sign up</Link>
    </div>
  );
}
