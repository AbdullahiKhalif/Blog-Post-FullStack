import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./Pages/SignInPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import ContextProvider from "./Context/Context.jsx";
import CreatePostPage from "./Pages/CreatePostPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/login",
        element: <SignInPage/>
      },
      {
        path: "/signup",
        element: <SignUpPage/>
      },
      {
        path: "/create-post",
        element: <CreatePostPage/>
      }
    ]
  }
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={router}/>
    </ContextProvider>
   
  </React.StrictMode>
);
