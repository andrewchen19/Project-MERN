import React from "react";

import { useNavigate } from "react-router-dom";

const Page404 = () => {
  // navigate
  const navigate = useNavigate();

  // event handling
  const buttonHandler = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }}>
      <div>
        <h2>您搜尋的頁面不存在，請確認後再重新查詢。</h2>
        <br />
        <button className="btn btn-primary btn-lg" onClick={buttonHandler}>
          回到首頁
        </button>
      </div>
    </div>
  );
};

export default Page404;
