import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Symbol } from "./components/Symbol";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/fetch-data-symbols',
    element: <Symbol />
  }
];

export default AppRoutes;
