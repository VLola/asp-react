import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import { Product } from "./components/Product";

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
    path: '/fetch-data-product',
    element: <Product />
  }
];

export default AppRoutes;
