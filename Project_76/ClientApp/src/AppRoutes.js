import { Home } from "./components/Home";
import { Change } from "./components/Change";

const AppRoutes = [
  {
    index: true,
    element: <Home/>
  },
  {
    path: '/change-data-product',
    element: <Change />
  }
];

export default AppRoutes;
