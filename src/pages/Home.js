import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import ProductsSection from "../components/ProductsSection";
import { supabase } from "../supabase/supabaseClient";
import SearchBar from "../components/SearchBar/SearchBar";
import useScrollPosition from "../hook/useScrollPosition";

export default function Home() {
  const [Products, setProducts] = useState(null);
  const [Condition, setCondition] = useState("");
  const [Category, setCategory] = useState("");

  const { scrollPosition } = useScrollPosition();

  function ScrollToTheTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    async function FetchAllProducts() {
      let query = supabase.from("products").select();

      if (Condition) {
        query = query.eq("Condition", Condition);
      }
      if (Category) {
        query = query.eq("Category", Category);
      }

      const { data } = await query;
      setProducts(data);

      if (Category === "All") {
        setCategory("");
      }
      if (Condition === "All") {
        setCondition("");
      }

      ScrollToTheTop();
    }

    FetchAllProducts();
  }, [Condition, Category]);

  return (
    <>
      <StyledSearchBarContainer>
        <SearchBar />
      </StyledSearchBarContainer>

      <StyledProductsSection>

        <Filter setCondition={setCondition} setCategory={setCategory} />

        <ProductsSection Data={Products} />

        <ToTopBtn
          scrollPosition={scrollPosition}
          ScrollToTheTop={ScrollToTheTop}
        />

      </StyledProductsSection>
    </>
  );
}

/* Components */

function Filter({ setCondition, setCategory }) {
  const categories = [
    { value: "All", label: "All" },
    { value: "PlayStation 4", label: "PlayStation 4" },
    { value: "PlayStation 3", label: "PlayStation 3" },
    { value: "Xbox 360", label: "Xbox 360" },
    { value: "Nintendo Switch", label: "Nintendo Switch" },
  ];

  const condition = [
    { value: "All", label: "All" },
    { value: "New", label: "New" },
    { value: "Used", label: "Used" },
  ];

  return (
    <StyledFilter>
      <div>
        <label>Condition</label>
        <Select
          className="select top1"
          placeholder="Condition"
          options={condition}
          defaultValue="All"
          onChange={(e) => setCondition(e.value)}
        />
      </div>

      <div>
        <label>Category</label>
        <Select
          className="select top2"
          placeholder="Category"
          options={categories}
          defaultValue="All"
          onChange={(e) => setCategory(e.value)}
        />
      </div>
    </StyledFilter>
  );
}

function ToTopBtn({ ScrollToTheTop, scrollPosition }) {
  return (
    <StyledToTopButton
      $scrollPosition={scrollPosition}
      onClick={() => ScrollToTheTop()}
    >
      Top
    </StyledToTopButton>
  );
}

/* Styles */

const StyledProductsSection = styled.div`
  padding: 2rem;
  margin: auto;

  @media screen and (max-width: 745px) {
    flex-direction: column;
  }
`;

const StyledSearchBarContainer = styled.div`
  width: 40vw;
  padding-top: 2rem;
  margin: auto;

  @media (max-width: 529px) {
    width: 80vw;
  }
`;

const StyledFilter = styled.div`
  position: sticky;
  top: 4.6rem;
  width: 85vw;

  margin: auto;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-radius: 5px;

  @media screen and (max-width: 745px) {
    top: 5rem;
    flex-direction: row;
  }

  label {
    font-weight: bold;
  }

  .select {
    margin-top: 0.5rem;
  }

  background-color: whitesmoke;
`;

const StyledToTopButton = styled.button`
  display: ${(props) => (props.$scrollPosition > 100 ? "block" : "none")};
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: black;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
`;
