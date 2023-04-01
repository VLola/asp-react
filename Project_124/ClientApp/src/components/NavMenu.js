import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    this.click = this.click.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
    this.renderLoginLinks = this.renderLoginLinks.bind(this);
    this.renderAdminLinks = this.renderAdminLinks.bind(this);
    this.renderUserLinks = this.renderUserLinks.bind(this);
    this.renderLinkOther = this.renderLinkOther.bind(this);
  }

  click(){
    sessionStorage.setItem("accessToken", "");
    sessionStorage.setItem("isLogin", "");
    sessionStorage.setItem("role", "");
    sessionStorage.setItem("access", "");
    window.location.href = "";
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  renderLinkOther(){
    let access = sessionStorage.getItem("access");
    if(access === "0" || access === "1"){
      return(
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/payment">Payment</NavLink>
        </NavItem>
      );
    }
    else if(access === "2"){
      return(
        <>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/history">History</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/payment">Payment</NavLink>
          </NavItem>
        </>
      );
    }
    else if(access === "3"){
      return(
        <>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/audio">Audio</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/history">History</NavLink>
          </NavItem>
        </>
      );
    }
    else{
      return(
        <>
        </>
      );
    }
  }

  renderUserLinks(){
    return(
      <>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/text">Text</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/image">Image</NavLink>
        </NavItem>
        {this.renderLinkOther()}
      </>
    );
  }
  
  renderAdminLinks(){
    return(
      <>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to="/fetch-users">Users</NavLink>
      </NavItem>
      </>
    );
  }

  renderLoginLinks(){
    let role = sessionStorage.getItem("role");
    if(role === "Admin") {
      return(
        <>
        {this.renderAdminLinks()}
        </>
      );
    }
    else if(role === "User") {
      return(
        <>
        {this.renderUserLinks()}
        </>
      );
    }
    else{
      return(
        <>
        </>
      );
    }
  }

  renderLinks(){
    let login = sessionStorage.getItem("isLogin");
    if(login === "true") {
      return(
        <>
        {this.renderLoginLinks()}
        <button className="btn btn-link" onClick={this.click}>Exit</button>
        </>
      );
    }
    else{
      return(
        <>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/landing">Landing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/auth">Authorization</NavLink>
          </NavItem>
        </>
      );
    }
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">Project_124</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <>
              {this.renderLinks()}
              </>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
    
  }
}
