import "react-calendar/dist/Calendar.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Index from "./pages";
import View from "./pages/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/view",
    element: <View />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
