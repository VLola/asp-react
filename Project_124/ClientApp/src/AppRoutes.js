import { Home } from "./components/Home";
import { Authentication } from "./components/Authentication";
import { Text } from "./components/user/Text";
import { Image } from "./components/user/Image";
import { History } from "./components/user/History";
import { Users } from "./components/admin/Users";

let AppRoutes;
let role = sessionStorage.getItem("role");

let isLogin = sessionStorage.getItem("isLogin");
if(isLogin === "true"){
  if(role === "Admin"){
    AppRoutes = [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/fetch-users',
        element: <Users />
      }
    ];
  }
  else if(role === "User"){
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
      }
    ];
  }
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
