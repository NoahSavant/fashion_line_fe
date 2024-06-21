import { createBrowserRouter, redirect } from "react-router-dom";

import { ManagementLayout, PublicLayout } from "@/layouts";
import ProtectedRoutes from './ProtectedRoutes'
import PublicRoutes from './PublicRoutes'
import { getCurrentPath } from "@/helpers/pathHelper";
import { NotFound } from "@/pages/errors";
import { getAuthentication } from "@/helpers/authenHelpers";

const isUnauthenPath = () => {
  const unauthenPath = ['/login', '/signup']
  return unauthenPath.includes(getCurrentPath());
};

const publicLoader = () => {
  if (getAuthentication() && isUnauthenPath()) {
    return redirect("/");
  }
  return null;
};

const protectedLoader = () => {
  if (getCurrentPath() !== '/') {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFound/>,
    loader: publicLoader,
    children: [
        ...PublicRoutes
    ],
  },
  {
    path: "/management",
    element: <ManagementLayout />,
    errorElement: <NotFound />,
    loader: protectedLoader,
    children: [
        ...ProtectedRoutes
    ],
  },
]);

export default router;
