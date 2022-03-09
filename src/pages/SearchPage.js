import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductSection from "../components/ProductsSection";
import { supabase } from "../supabase/supabaseClient";

export default function SearchPage() {
  const [Products, setProducts] = useState([]);

  let [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    async function SearchFetch() {
      const { data } = await supabase
        .from("products")
        .select()
        .textSearch("Title", query, {
          type: "phrase",
          config: "english",
        });

      setProducts(data);
    }

    SearchFetch();
  }, [query]);

  return (
    <div>
      <StyledSearchBarContainer>
        <SearchBar searchQ={query} />
      </StyledSearchBarContainer>
      <ProductSection Data={Products} />
    </div>
  );
}

const StyledSearchBarContainer = styled.div`
  width: 40vw;
  padding-top: 2rem;
  margin: auto;

  @media (max-width: 529px) {
    width: 80vw;
  }
`;
