import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { browserHistory } from 'react-router';
import { Container, Flex, Box, Input, Button, Subhead, Text } from 'rebass';
import auth from "../auth";
import Home from '../home/home.js';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const provider = new firebase.auth.FacebookAuthProvider();
class Login extends Component {

  constructor(props) {

    super(props);
    this.state = ({
      emailLocal: localStorage.getItem('email')
    })
  }

  render() {
    const { emailLocal } = this.state;
    const responseFacebook = (response) => {
       console.log(response);
      //localStorage.setItem("email", "rajgohel0007@gmail.com");
       localStorage.setItem("email",response.email);
      auth.login(() => {
        this.props.history.push("/home");
      });
    }

    if (!emailLocal) {
      return (
        <div>
          <div className="bg_class">
            <div className="login">
              <h1>CricBuzz</h1>
              <Button variant="contained" color="primary" >
              <FacebookLogin
              appId="2500849506601645"
              fields="name,email,picture"
              callback={responseFacebook}
              isMobile={true}
              />
              </Button>
              {/* <Button onClick={responseFacebook}>Log in</Button> */}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Home />
        </div>
      )
    }

  }
}

export default Login;