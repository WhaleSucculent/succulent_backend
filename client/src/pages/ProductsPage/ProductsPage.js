import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import ProductDetailPage from "pages/ProductDetailPage/ProductDetailPage";

const ProductsPage = () => {
  return (
    <>
      <div>ProductsPage</div>
      <Outlet />
      <li>
        <Link to='ProductDetailPage'>ProductDetailPage</Link>
      </li>
    </>
  )
}

export default ProductsPage;
