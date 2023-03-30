import { Home } from "./components/Home";
import { Authentication } from "./components/Authentication";
import { Text } from "./components/Text";
import { Image } from "./components/Image";
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
    path: '/text',
    element: <Text />
  },
  {
    path: '/image',
    element: <Image />
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
      path: '/auth',
      element: <Authentication />
    }
  ]
}

export default AppRoutes;
