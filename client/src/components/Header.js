import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div>Headers</div>
      <ul>
        <li>
          <Link to={'landing'}>landing</Link>
        </li>
        <li>
          <Link to={'login'}>login</Link>
        </li>
        <li>
          <Link to={'register'}>register</Link>
        </li>
        <li>
          <Link to={'products'}>products</Link>
        </li>
        <li>
          <Link to={'products/155'}>products/:id</Link>
        </li>
        <li>
          <Link to={'collections'}>collections</Link>
        </li>
        <li>
          <Link to={'collections/new'}>collections/new</Link>
        </li>
        <li>
          <Link to={'collections/rare'}>collections/rare</Link>
        </li>
        <li>
          <Link to={'collections/best'}>collections/best</Link>
        </li>
        <li>
          <Link to={'checkout'}>checkout</Link>
        </li>
        <li>
          <Link to={'payment'}>payment</Link>
        </li>
        <li>
          <Link to={'profile'}>profile</Link>
        </li>
        <li>
          <Link to={'admin'}>admin</Link>
        </li>
        <li>
          <Link to={'admin/home'}>admin/home</Link>
        </li>
        <li>
          <Link to={'admin/product'}>admin/product</Link>
        </li>
        <li>
          <Link to={'admin/stock'}>admin/stock</Link>
        </li>
        <li>
          <Link to={'admin/order'}>admin/order</Link>
        </li>
        <li>
          <Link to={'admin/user'}>admin/user</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Header;
