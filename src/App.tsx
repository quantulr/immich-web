import { RouterProvider } from "react-router-dom";
import Router from "./router.tsx";
import { Provider } from "@/components/ui/provider";

function App() {
  return (
    <>
      <Provider>
        <RouterProvider
          future={
            {
              // v7_startTransition: true,
              // v7_relativeSplatPath: true,
              // v7_normalizeFormMethod: true,
            }
          }
          router={Router}
        />
      </Provider>
    </>
  );
}

export default App;
