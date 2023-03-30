import React, { Component } from 'react';


export class Authentication extends Component {
  static displayName = Authentication.name;

  constructor(props) {
    super(props);
    this.state = { isLogin: true, email: "", password: "", confirmPassword: "" }
    this.click = this.click.bind(this);
    this.login = this.login.bind(this);
    this.registration = this.registration.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
  }

  click(){
    this.setState({ isLogin: !this.state.isLogin });
  }

  async login(){
    let data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
        })
      };
    let response = await fetch('authentication/login', data);
    let result = await response.json();
    if(response.status === 200){
      sessionStorage.setItem("accessToken", result.token);
      sessionStorage.setItem("role", result.role);
      sessionStorage.setItem("access", result.access);
      sessionStorage.setItem("isLogin", "true");
      this.setState({email: "", password: "", confirmPassword: ""});
      window.location.href = "";
    }
    console.log(result);
  }

  async registration(){
    if(this.state.password === this.state.confirmPassword){
      let data = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
          })
        };
      let response = await fetch('authentication/registration', data);
      let result = await response.json();
      console.log(result);
    }
    else alert("Password mismatch!");
    this.setState({email: "", password: "", confirmPassword: ""});
  }

  
  changeEmail(event) {
    this.setState({email: event.target.value});
  }
  
  changePassword(event) {
    this.setState({password: event.target.value});
  }

  changeConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value});
  }

  render() {
    if(this.state.isLogin){
      return (
        <div className='h-100 d-flex justify-content-center align-items-center'>
            <div className="card shadow">
                <div className="card-body text-center justify-content-center m-2">
  
                    <div className="form-outline form-white mb-4">
                        <input type="email" className="form-control form-control-lg" placeholder="Email" value={this.state.email} onChange={this.changeEmail}/>
                    </div>
  
                    <div className="form-outline form-white mb-4">
                        <input type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.changePassword}/>
                    </div>
  
                    <button className="btn btn-outline-secondary btn-lg px-5" onClick={this.login}>Login</button>
  
                    <div className="d-flex justify-content-center mt-2">
                      <button type="button" className="btn btn-link" onClick={this.click}>Don't have an account? Register</button>
                    </div>
  
                </div>
            </div>
          </div>
      );
    }
    else{
      return (
        <div className='h-100 d-flex justify-content-center align-items-center'>
            <div className="card shadow">
                <div className="card-body text-center justify-content-center m-2">
  
                    <div className="form-outline form-white mb-4">
                        <input type="email" className="form-control form-control-lg" placeholder="Email" value={this.state.email} onChange={this.changeEmail}/>
                    </div>
  
                    <div className="form-outline form-white mb-4">
                        <input type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.changePassword}/>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <input type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.confirmPassword} onChange={this.changeConfirmPassword}/>
                    </div>
  
                    <button className="btn btn-outline-secondary btn-lg px-5" onClick={this.registration}>Registration</button>

                    <div className="d-flex justify-content-center mt-2">
                      <button type="button" className="btn btn-link" onClick={this.click}>You have account? Login</button>
                    </div>
  
                </div>
            </div>
          </div>
      );
    }
    
  }
}
