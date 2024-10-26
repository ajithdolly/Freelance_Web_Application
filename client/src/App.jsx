import "./App.scss";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import Update from "./pages/update/Update";
import { store } from "./store/store";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Outlet />
            <Footer />
          </QueryClientProvider>
        </Provider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/update/:id",
          element: <Update />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
