import { RouteObject } from "react-router-dom";
import AuthGuard from "core/guards/auth.guard";
import { lazy } from "react";
import { appRoutes } from "./routes";

import DashboardLayout from "core/components/layout/dashboard-layout";
import SetupCompleteGuard from "core/guards/setup-complete.guard";
import RestaurantSetup from "controllers/auth/restaurant-setup";
import IsRestaurantCreatedGuard from "core/guards/is-restaurant-created.guard";
import RestaurantChoose from "controllers/auth/restaurant-choose";
import HomeLayout from "core/components/layout/home-layout";
import Home from "controllers/home/home";
const Dashboard = lazy(
  () => import("controllers/dashboard/dashboard.controller")
);
const SignInPage = lazy(() => import("controllers/auth/signin.controller"));
const SignUpPage = lazy(() => import("controllers/auth/signup.controller"));

const routes: RouteObject[] = [
  {
    element: <HomeLayout />,
    path: appRoutes.HOME,
    children: [
      {
        element: <Home />,
        index: true,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <IsRestaurantCreatedGuard>
          <SetupCompleteGuard>
            <DashboardLayout />
          </SetupCompleteGuard>
        </IsRestaurantCreatedGuard>
      </AuthGuard>
    ),
    children: [
      {
        element: <Dashboard />,
        path: appRoutes.DASHBOARD,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    path: appRoutes.RESTAURANT_SETUP,
    children: [
      {
        element: <RestaurantSetup />,
        index: true,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    path: appRoutes.RESTAURANT_CHOOSE,
    children: [
      {
        element: <RestaurantChoose />,
        index: true,
      },
    ],
  },
  {
    element: <SignInPage />,
    path: appRoutes.SIGN_IN,
  },
  {
    element: <SignUpPage />,
    path: appRoutes.SIGN_UP,
  },
  {
    element: <div>404. Not found!</div>,
    path: "*",
  },
];

export default routes;
