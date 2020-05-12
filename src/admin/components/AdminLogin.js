import React, { useState } from "react";
import { login } from "../services/api-admin";
import {
  MyButton,
  Form,
  LoginSignUpContainer,
  MyInput,
  Errors,
} from "../../elements";

const AdminLogin = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setErrors(null);
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
          userData = { ...userData, user: json.data, admin: true };
          props.handleLogin(userData);
          props.history.push("/admin");
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
    <LoginSignUpContainer title="DateNight Admin Login">
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
        <MyButton onClick={handleSubmit}>Login</MyButton>
      </Form>
    </LoginSignUpContainer>
  );
};

export default AdminLogin;
