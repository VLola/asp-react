import { Home } from "./components/Home";
import { Authentication } from "./components/Authentication";
import { Text } from "./components/user/Text";
import { Image } from "./components/user/Image";
import { Audio } from "./components/user/Audio/Audio";
import { History } from "./components/user/History";
import { Users } from "./components/admin/Users";
import { Landing } from "./components/Landing";

let AppRoutes;
let role = sessionStorage.getItem("role");

let isLogin = sessionStorage.getItem("isLogin");
if(isLogin === "true"){
  if(role === "Admin"){
    AppRoutes = [
      { index: true, element: <Home /> },
      { path: '/fetch-users', element: <Users /> }
    ];
  }
  else if(role === "User"){
    let access = sessionStorage.getItem("access");
    if(access === "0" || access === "1"){
      AppRoutes = [
        { index: true, element: <Home /> },
        { path: '/text', element: <Text /> },
        { path: '/image', element: <Image /> }
      ];
    }
    else if(access === "2"){
      AppRoutes = [
        { index: true, element: <Home /> },
        { path: '/text', element: <Text /> },
        { path: '/image', element: <Image /> },
        { path: '/history', element: <History /> }
      ];
    }
    else if(access === "3"){
      AppRoutes = [
        { index: true, element: <Home /> },
        { path: '/text', element: <Text /> },
        { path: '/image', element: <Image /> },
        { path: '/audio', element: <Audio /> },
        { path: '/history', element: <History /> }
      ];
    }
  }
  else{
    AppRoutes = [
      { index: true, element: <Home /> }
    ];
  }
}
else{
  AppRoutes = [
    { index: true, element: <Home /> },
    { path: '/landing', element: <Landing /> },
    { path: '/auth', element: <Authentication /> }
  ]
}

export default AppRoutes;
