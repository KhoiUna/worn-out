import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Index from "./pages";
import View from "./pages/[id]";
import Add from "./pages/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/view/:outfitID",
    element: <View />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
