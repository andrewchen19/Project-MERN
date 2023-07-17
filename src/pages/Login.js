import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth_service";

const Login = ({ setCurrentUser }) => {
  // navigate
  const navigate = useNavigate();

  // state
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  // 用來處理錯誤訊息
  let [message, setMessage] = useState("");

  // event handling
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = async () => {
    try {
      let response = await AuthService.login(email, password);
      // console.log(response);

      // 將 responese 的 data 轉化成 JSON String，儲存到 local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      setCurrentUser(AuthService.getCurrentUser());

      window.alert("登入成功，您將被導向到個人頁面");
      navigate("/profile");
    } catch (err) {
      // console.log(err);
      setMessage(err.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }} className="col-md-12">
      <div>
        {/* 特殊情況的 logical operation */}
        {message && <div className="alert alert-danger">{message}</div>}

        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={emailHandler}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={passwordHandler}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={loginHandler} className="btn btn-primary btn-block">
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
