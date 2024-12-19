import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Blackjack from "./pages/Blackjack";

function Root() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blackjack",
    element: <Blackjack />,
  },
]);

export default Root;
