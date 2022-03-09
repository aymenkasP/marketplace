import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import PrivateRoute from "./helper/PrivateRoute";
import Chat from "./pages/Chat";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductEditPage from "./pages/ProductEditPage";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/Profile";
import ProfileSittings from "./pages/ProfileSittings";
import SearchPage from "./pages/SearchPage";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
        path="/"
        element={<Navigate to="/home" />}
    />
        <Route path="home" element={<Home />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="profile/:id" element={<Profile />} />
        <Route path="product/edit/:id" element={<ProductEditPage />} />

        <Route
          path="profilesittings"
          element={
            <PrivateRoute>
              <ProfileSittings />
            </PrivateRoute>
          }
        />
        <Route
          path="create-product"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="messages"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
