import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../helper/supabaseHelper';
import CreateProduct from './CreateProduct'

export default function ProductEditPage() {
  const [ProductData, setProductData] = useState([]);

  const params = useParams();


  useEffect(() => {
    async function getProductPageInfo() {
      const product = await getProductById(params.id);
      setProductData(product);
    }
    getProductPageInfo();
  }, [params.id]);

  return (
    <div>

      {
        ProductData.length && (
              <CreateProduct Data={ProductData}  edit />
        )
      }
    </div>
  )
}
