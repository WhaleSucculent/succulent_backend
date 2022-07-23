import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <>
      <div>AdminHeader</div>
      <ul>
        <li>
          <Link to={'home'}>home</Link>
        </li>
        <li>
          <Link to={'product'}>product</Link>
        </li>
        <li>
          <Link to={'stock'}>stock</Link>
        </li>
        <li>
          <Link to={'order'}>order</Link>
        </li>
        <li>
          <Link to={'user'}>user</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default AdminHeader;
