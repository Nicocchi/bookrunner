
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import Root from "./routes/root.tsx";
import ErrorPage from "./error-page.tsx";
import App from "./App.tsx";
import Authors from "./pages/Authors/Authors.tsx";
import Library from "./pages/Books/Library.tsx";
import "./index.css";
// import AddBooks from "./pages/Books/AddBook.tsx";
// import AddAuthor from "./pages/Authors/AddAuthor.tsx";
import BookOverview from "./pages/Books/BookOverview.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import BooksProvider from "./context/BooksProvider.tsx";
import BookView from "./pages/Books/BookView.tsx";

// const darkTheme = createTheme({
//   type: "dark",
//   theme: {},
// });

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "book/viewer",
        element: <BookView />,
      },
      {
        path: "book/:id",
        element: <BookOverview />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider theme={lightTheme}>
      <BooksProvider>
        <RouterProvider router={router} />
        </BooksProvider>
    </NextUIProvider>
  </React.StrictMode>
);
