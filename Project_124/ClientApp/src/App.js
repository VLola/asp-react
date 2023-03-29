import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AppRoutesUser from './AppRoutesUser';
import { Layout } from './components/Layout';
import { LayoutUser } from './components/LayoutUser';
import './custom.css';



export default class App extends Component {
  static displayName = App.name;

  render() {
    let token = sessionStorage.getItem("accessToken")
    console.log(token);
    if(token == undefined || token == null) token = "";
    if(token !== ""){
      return (
        <LayoutUser>
          <Routes>
            {AppRoutesUser.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </LayoutUser>
      );
    }
    else{
      return (
        <div>
          <Layout>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
          </Layout>
        </div>
      );
    }
  }
}
