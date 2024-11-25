import { createBrowserRouter } from "react-router-dom";
import Login from "@/components/Login.tsx";
import Albums from "@/components/Albums.tsx";
import AlbumPhotoList from "@/components/AlbumPhotoList.tsx";
import RootLayout from "@/components/RootLayout.tsx";
import UnAuth from "@/components/UnAuth.tsx";
import RequireAuth from "@/components/RequireAuth.tsx";
import Library from "@/components/Library.tsx";
import PhotoViewer from "@/components/PhotoViewer.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <UnAuth />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "",
        element: <RootLayout />,
        children: [
          {
            path: "",
            element: <Library />,
          },
          {
            path: "/albums",
            element: <Albums />,
          },
          {
            path: "/albums/:albumId",
            element: <AlbumPhotoList />,
          },
          {
            path: "/photos/:photoId",
            element: <PhotoViewer />,
          },
          {
            path: "/albums/:albumId/photos/:photoId",
            element: <PhotoViewer />,
          },
        ],
      },
    ],
  },
]);

export default router;
