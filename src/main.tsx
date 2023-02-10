import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SidebarWithHeader from "./components/LayoutMain";
import { TablePage } from "./components/TablePage";
import { FormPage } from "./components/FormPage";
import Favorite from "./components/Favorite";
import TablePagePagination from "./components/TablePagePagination";

const router = [
  {
    path: "/",
    element: <TablePage />,
  },
  {
    path: "/Form",
    element: <FormPage />,
  },
  {
    path: "/Favorite",
    element: <Favorite />,
  },
  {
    path: "/User-list",
    element: <TablePagePagination />,
  },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ChakraProvider>
    <BrowserRouter>
      <SidebarWithHeader>
        <Routes>
          {/* <Route path="/" element={<TablePage />} /> */}
          {router.map((item: any) => {
            return (
              <Route key={item.path} path={item.path} element={item.element} />
            );
          })}
        </Routes>
        {/* <RouterProvider router={router} /> */}
      </SidebarWithHeader>
    </BrowserRouter>
  </ChakraProvider>
  // </React.StrictMode>
);
