import Login from "./page/Login";
import NotFound from "./page/Notfound";
import { useRoutes } from "react-router-dom";
import Home from "./page/Home";
const routesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
function App() {
  const routes = useRoutes(routesConfig);

  return (
    <div>
      <div>{routes}</div>
    </div>
  );
}

export default App;
