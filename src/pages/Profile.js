import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ currentUser }) => {
  // navigate
  const navigate = useNavigate();

  // event handling
  const buttonHandler = () => {
    navigate("/login");
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }}>
      {/* 特殊情況的 logical operation */}
      {!currentUser && (
        <div>
          <h2>在獲取您的個人資料之前，您必須先登入。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler}>
            回到登入頁面
          </button>
        </div>
      )}

      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>用戶名稱：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>用戶 ID：{currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>註冊的電子信箱：{currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身分：{currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
