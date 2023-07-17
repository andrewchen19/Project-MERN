import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course_service";

const CreateCourse = ({ currentUser }) => {
  // navigate
  const navigate = useNavigate();

  // state
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  // 用來處理錯誤訊息
  let [message, setMessage] = useState("");

  // event handling
  const buttonHandler = () => {
    navigate("/login");
  };
  const buttonHandler2 = () => {
    navigate("/course");
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const pricetionHandler = (e) => {
    setPrice(e.target.value);
  };
  const createHandler = async () => {
    try {
      await CourseService.createCourse(title, description, price);

      window.alert("新增成功，您將被導向到課程頁面");
      // 重新導向
      navigate("/course");
    } catch (err) {
      // console.log(err)
      setMessage(err.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }}>
      {/* 特殊情況的 logical operation */}
      {!currentUser && (
        <div>
          <h2>在新增課程之前，您必須先登錄。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler}>
            回到登入頁面
          </button>
        </div>
      )}

      {/* 已登入，但是是以學生身分 */}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <h2>只有身分是導師的用戶，可以新增課程。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler2}>
            回到課程頁面
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          {message && <div className="alert alert-danger">{message}</div>}

          <div className="form-group">
            <label for="exampleforTitle">課程名稱：</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              placeholder="長度請至少為3個字以上"
              onChange={titleHandler}
            />
            <br />
            <label for="exampleforContent">課程內容：</label>
            <textarea
              className="form-control"
              id="exampleforContent"
              aria-describedby="emailHelp"
              name="content"
              placeholder="長度請至少為5個字以上"
              onChange={descriptionHandler}
            />
            <br />
            <label for="exampleforPrice">課程價格：</label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              placeholder="輸入的價格只能介於 0 ~ 9999"
              onChange={pricetionHandler}
            />
            <br />
            <button className="btn btn-primary" onClick={createHandler}>
              新增課程
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
