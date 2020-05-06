import React, { useState } from "react";
import { login } from "../services/api";
import { useLocation } from "react-router-dom";
import {
  Button,
  LoginSignUpContainer,
  Form,
  MyLink,
  MyInput,
  Errors,
} from "../../elements";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const query = useQuery();
  const isAccountConfirmationPending = !!query.get(
    "account_confirmation_pending"
  );
  const isAccountConfirmed = !!query.get("account_confirmation_success");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let userData;
    login(formData)
      .then((res) => {
        if (res.status < 400) {
          const accessToken = res.headers.get("access-token");
          const client = res.headers.get("client");
          const uid = res.headers.get("uid");
          const expiry = res.headers.get("expiry");
          userData = { accessToken, client, expiry, uid };
        }
        return res.json();
      })
      .then((json) => {
        if (!json.errors) {
          userData = { ...userData, user: json.data, admin: false };
          props.handleLogin(userData);
          props.history.push("/");
        } else {
          setErrors(json.errors);
        }
      });
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <LoginSignUpContainer>
      <h1 className="title-fantasy-font">DateNight</h1>
      <>
        {isAccountConfirmationPending ? (
          <h3>Confirmation email sent - check your inbox!</h3>
        ) : null}
        {isAccountConfirmed ? (
          <h3>Thank you for confirming your account! Please login.</h3>
        ) : null}
        <Form>
          {errors ? <Errors errors={errors} /> : null}
          <MyInput
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <MyInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Button onClick={handleSubmit}>Login</Button>
        </Form>
        <MyLink destination="/signup">New user? Sign up for an account</MyLink>
      </>
    </LoginSignUpContainer>
  );
};

export default Login;
