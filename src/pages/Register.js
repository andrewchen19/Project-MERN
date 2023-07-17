import React, { useState } from "react";
// 在 React 組件中進行動態導航
// 可以在使用者觸發的事件處理函式或其他條件下，通過程式碼來執行導航操作
import { useNavigate } from "react-router-dom";
// 導入 instance
import AuthService from "../services/auth_service";

const Register = () => {
  // navigate
  const navigate = useNavigate();

  // state
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  // 用來處理錯誤訊息
  let [message, setMessage] = useState("");

  // event handling
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const roleHandler = (e) => {
    setRole(e.target.value);
  };
  const registerHandler = async () => {
    try {
      await AuthService.register(username, email, password, role);

      window.alert("註冊成功，您將被導向到登入頁面");
      // 重新導向
      navigate("/login");
    } catch (err) {
      // console.log(err)

      // 將 AxiosError 當中的錯誤訊息提取出來
      setMessage(err.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }} className="col-md-12">
      <div>
        {/* 特殊情況的 logical operation */}
        {/* message 為 empty string (falsy value)，原本會 return first falsy operand */}
        {/* 但 empty string 為無效內容的表達式，因此不會顯示任何內容 */}
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={usernameHandler}
            type="text"
            className="form-control"
            name="username"
            placeholder="長度請至少為3個字以上"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            onChange={emailHandler}
            type="text"
            className="form-control"
            name="email"
            placeholder="請填入有效的信箱格式"
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
            placeholder="長度請至少為5個字以上"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">身分：</label>
          <input
            onChange={roleHandler}
            type="text"
            className="form-control"
            placeholder="只能填入 student 或是 instructor 這兩個選項其一"
            name="role"
          />
        </div>
        <br />
        <button onClick={registerHandler} className="btn btn-primary">
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
