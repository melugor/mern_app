import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { map } from "lodash";
import { AdminLayout } from '../layouts';
import { Auth, Users } from '../pages/admin';

const user = { email: "test@test.com" };

export function AdminRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
      ) : (
        <>
          {["/admin", "/admin/blog"].map((path) => (
            <Route key={path} path={path} element={loadLayout(AdminLayout, Users)} />
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
        </>
      )}
    </Routes>
  );
}
