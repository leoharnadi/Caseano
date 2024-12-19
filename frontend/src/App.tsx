import { createBrowserRouter, RouterProvider } from "react-router";

import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

function Root() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: undefined,
    children: [
      {
        element: undefined,
        children: [
          {
            element: undefined,
            children: [
              {
                index: true,
                element: undefined,
              },
              {
                path: "/transactions",
                element: undefined,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: undefined,
  },
  {
    path: "/logout",
    element: undefined,
  },
]);

export default Root;
