import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth_service";

const Nav = ({ currentUser, setCurrentUser }) => {
  // event handling
  const logoutHandler = () => {
    AuthService.logout();

    window.alert("登出成功，您將被導向到首頁");
    // 將 currentUser 變回 null
    setCurrentUser(null);
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">首頁</Link>
        </li>

        {!currentUser && (
          <li>
            <Link to="/register">註冊會員</Link>
          </li>
        )}

        {!currentUser && (
          <li>
            <Link to="/login">會員登入</Link>
          </li>
        )}

        {currentUser && (
          <li>
            <Link to="/" onClick={logoutHandler}>
              會員登出
            </Link>
          </li>
        )}

        {currentUser && (
          <li>
            <Link to="/profile">個人頁面</Link>
          </li>
        )}

        {currentUser && (
          <li>
            <Link to="/course">課程頁面</Link>
          </li>
        )}

        {/* 因為 null 不會有屬性，為了避免顯示為錯誤，必須在第一個加上 currentUser */}
        {currentUser && currentUser.user.role === "instructor" && (
          <li>
            <Link to="/course/create">新增課程</Link>
          </li>
        )}

        {currentUser && currentUser.user.role === "student" && (
          <li>
            <Link to="/course/enroll">註冊課程</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
