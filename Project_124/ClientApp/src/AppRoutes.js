import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Authentication } from "./components/Authentication";
import { Text } from "./components/Text";
import { History } from "./components/History";

let AppRoutes;

let isLogin = sessionStorage.getItem("isLogin");
if(isLogin == "true"){
  AppRoutes = [
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
    path: '/text',
    element: <Text />
  },
  {
    path: '/history',
    element: <History />
  }
];
}
else{
  AppRoutes = [
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
      path: '/auth',
      element: <Authentication />
    }
  ]
}

export default AppRoutes;
