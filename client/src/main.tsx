import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home/Home";
import GamePage from "./pages/GamePage/GamePage";


const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/",
				element: <GamePage />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
