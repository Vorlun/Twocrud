import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout";
import User from "./User";
import Product from "./Product";
import Error10 from "./not-found";

const AppRouter = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<User />} />
          <Route path="/product" element={<Product />} />
          <Route path="*" element={<Error10 />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default AppRouter;
