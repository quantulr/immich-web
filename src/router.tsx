import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.tsx";
import Albums from "./components/Albums.tsx";
import AlbumPhotoList from "./components/AlbumPhotoList.tsx";
import RootLayout from "./components/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/albums",
        element: <Albums />,
      },
      {
        path: "/albums/:albumId",
        element: <AlbumPhotoList />,
      },
    ],
  },
]);

export default router;
