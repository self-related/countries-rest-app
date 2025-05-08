import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import SearchPage from "./pages/search";
import CountryPage from "./pages/country";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/search",
                element: <SearchPage />
            },
            {
                path: "/search/:query",
                element: <SearchPage />
            },
            {
                path: "/country/:code",
                element: <CountryPage />
            }
        ]
    }
]);