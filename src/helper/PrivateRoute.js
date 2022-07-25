import { Navigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function PrivateRoute({ children }) {
    const session = supabase.auth.session();


    return session ? children : <Navigate to="/login" />;
  }
  