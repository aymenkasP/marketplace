import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import { downloadImage } from "../helper/supabaseHelper";
import { supabase } from "../supabase/supabaseClient";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import second from "../Img/CreateProduct.png";

import Notification from "../components/Notification";

export default function CreateProduct({ Data, edit }) {
  const [Title, setTitle] = useState(Data?.[0]?.Title ?? "");
  const [ProductImagePath, setProductImagePath] = useState(
    Data?.[0]?.ProductImagePath ?? null
  );
  const [ProductImage, setProductImage] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(Data?.[0]?.PhoneNumber ?? "");
  const [Price, setPrice] = useState(Data?.[0]?.Price ?? "");
  const [Quantity, setQuantity] = useState(Data?.[0]?.Quantity ?? "");
  const [Description, setDescription] = useState(Data?.[0]?.Description ?? "");
  const [Condition, setCondition] = useState(
    Data?.[0]?.Condition ?? "Condition"
  );
  const [Category, setCategory] = useState(Data?.[0]?.Category ?? "Category");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({
    variant: "",
    message: "",
  });

  const user = supabase.auth.user();

  const categories = [
    { value: "PlayStation 4", label: "PlayStation 4" },
    { value: "PlayStation 3", label: "PlayStation 3" },
    { value: "Xbox 360", label: "Xbox 360" },
    { value: "Nintendo Switch", label: "Nintendo Switch" },
  ];
  const condition = [
    { value: "New", label: "New" },
    { value: "Used", label: "Used" },
  ];

  useEffect(() => {
    ProductImagePath &&
      downloadImage(ProductImagePath, "products").then((value) =>
        setProductImage(value)
      );
  }, [ProductImagePath]);

  function phonenumber(inputtxt) {
    let phoneno = /^\(?([0-9]{2})\)?[  ]?([0-9]{3})?[  ]?([0-9]{4})$/;

    if (inputtxt.toString().match(phoneno)) {
      return true;
    } else {
      alert("your phone number is invalid");
      return false;
    }
  }

  async function OnCreate() {
    const ValidatePhoneNumber = phonenumber(PhoneNumber);
    const ValidateTheInputs =
      Title &&
      PhoneNumber &&
      ValidatePhoneNumber &&
      ProductImage &&
      Price &&
      Quantity &&
      Description &&
      Condition &&
      Category;

    if (!ValidateTheInputs)
      return setNotification({
        variant: "error",
        message: "make sure to add all the required fields",
      });

    setLoading(true);
    const { error } = await supabase.from("products").insert([
      {
        user: user.id,
        email: user.email,
        ProductImagePath,
        Title,
        Category,
        Price,
        Condition,
        Description,
        Quantity,
        PhoneNumber,
      },
    ]);

    setLoading(false);
    setNotification({
      variant: error ? "error" : "success",
      message: error ? error.message : "The Product has been published!",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  async function OnUpdate() {
    const ValidatePhoneNumber = phonenumber(PhoneNumber);
    const ValidateTheInputs =
      Title &&
      PhoneNumber &&
      ValidatePhoneNumber &&
      ProductImage &&
      Price &&
      Quantity &&
      Description &&
      Condition &&
      Category;

    if (!ValidateTheInputs)
      return setNotification({
        variant: "error",
        message: "make sure to add all the required fields",
      });

    setLoading(true);
    const { error } = await supabase
      .from("products")
      .update({
        ProductImagePath,
        Title,
        Category,
        Price,
        Condition,
        Description,
        Quantity,
        PhoneNumber,
      })
      .match({ id: Data?.[0]?.id });
    setLoading(false);
    setNotification({
      variant: error ? "error" : "success",
      message: error ? error.message : "The Product has been Update it!",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function uploadProductImage(event) {
    setUploading(true);
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file);
      setProductImagePath(filePath);

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      {notification.message && (
        <Notification
          Message={notification.message}
          variant={notification.variant}
        />
      )}

      <StyledCreateProductContainer>
        <StyledCreateProductCard>
          <StyledImageContainer>
            <img
              src={!ProductImage ? second : ProductImage}
              alt={Title ?? "product"}
            />
            <label htmlFor="single" style={{ cursor: "pointer" }}>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
              </svg>
              {uploading ? "Uploading ..." : "Update"}
            </label>
            <input
              style={{
                visibility: "hidden",
                position: "absolute",
              }}
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadProductImage}
            />
          </StyledImageContainer>
          <div>
            <Input
              value={Title}
              setValue={setTitle}
              label="Title"
              type="text"
              WithLabel
              width="100%"
            />
            <StyledGrid2col>
              <div>
                <Input
                  value={PhoneNumber}
                  setValue={setPhoneNumber}
                  label="phone"
                  type="tel"
                  WithLabel
                  width="100%"
                />
                <small>Format: 123 456 789</small>
              </div>
              <Input
                value={Price}
                setValue={setPrice}
                label="Price"
                type="number"
                WithLabel
                width="100%"
              />
            </StyledGrid2col>
            <StyledGrid3col>
              <Select
                className="select"
                placeholder={Condition}
                options={condition}
                onChange={(e) => setCondition(e.value)}
              />
              <Select
                className="select"
                placeholder={Category}
                onChange={(e) => setCategory(e.value)}
                options={categories}
              />
              <Input
                value={Quantity}
                setValue={setQuantity}
                label="Quantity"
                type="number"
                width="100%"
              />
            </StyledGrid3col>

            <StyledDescriptionText>
              <DescriptionInput value={Description} setValue={setDescription} />
            </StyledDescriptionText>

            <StyledButtonContainer>
              <PublishButton
                OnClickHandler={edit ? OnUpdate : OnCreate}
                edit={edit}
                loading={loading}
              />
            </StyledButtonContainer>
          </div>
        </StyledCreateProductCard>
      </StyledCreateProductContainer>
    </>
  );
}

/* Components */
function DescriptionInput({ value, setValue }) {
  return (
    <div className="description">
      <label htmlFor="message">Description</label>
      <div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  );
}

function PublishButton({ OnClickHandler, edit, loading }) {
  return (
    <div>
      <button className="submit" onClick={() => OnClickHandler()}>
        <span>
          {" "}
          {loading && "Loading.."} {edit ? "update" : "publish"}{" "}
        </span>
      </button>
    </div>
  );
}

/* Styles */
const StyledCreateProductContainer = styled.div`
  padding-top: 2rem;
  width: 90%;
  margin: auto;
`;
const StyledImageContainer = styled.div`
  margin-bottom: 1.5rem;

  img {
    width: 100%;
  }

  input {
    border: none;
  }
`;
const StyledCreateProductCard = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 3rem;
  border-radius: 9px;
  background: #ffffff;
  box-shadow: 5px 5px 11px #e6e6e6, -5px -5px 11px #ffffff;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;
const StyledGrid2col = styled.div`
  display: grid;
  margin: 1rem 0;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
`;
const StyledGrid3col = styled.div`
  display: grid;
  place-items: center;
  align-items: center;
  margin: 1rem 0;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  .select {
    width: 100%;
  }
`;
const StyledDescriptionText = styled.div`
  .description {
    .ql-editor {
      height: 30vh;
    }

    label {
      font-weight: bold;
    }
  }
`;
const StyledButtonContainer = styled.div`
  button {
    background-color: black;
    border-radius: 4px;
    border-style: none;
    width: 200px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-weight: 700;
    line-height: 1.5;
    margin-top: 1.3rem;
    padding: 1rem 2rem;
    outline: none;
    overflow: hidden;

    text-align: center;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover,
    &:focus {
      opacity: 0.75;
    }
  }
`;
