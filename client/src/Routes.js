import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App";
import NewsPage from "./Components/NewsPage";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<App />} />
    <Route path="/ndtv" element={<NewsPage dataName="ndtv" />} />
    <Route path="/indiatoday" element={<NewsPage dataName="indiatoday" />} />
    <Route path="/indiatv" element={<NewsPage dataName="indiatv" />} />
    <Route
      path="/indianexpress"
      element={<NewsPage dataName="indianexpress" />}
    />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);
export default function Routes() {
  return <RouterProvider router={router} />;
}
