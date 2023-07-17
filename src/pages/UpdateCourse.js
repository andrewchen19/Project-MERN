import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course_service";

const UpdateCourse = ({ currentUser, courseID, instructorID }) => {
  // navigate
  const navigate = useNavigate();

  // state
  // React 要求在使用 state 時，狀態的初始值必須是有效的，不能是 null 或 undefined
  const [courseData, setCourseData] = useState({});
  // 用來處理錯誤訊息
  let [message, setMessage] = useState("");

  // useEffect (第一次渲染時，就先執行一次裡面的 callback)
  useEffect(() => {
    async function execution() {
      try {
        let response = await CourseService.findCourseById(courseID);
        // console.log(response);

        // courseDate 是個 object (等等會需要修改它)
        setCourseData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    execution();
  }, []);

  // event handling
  const buttonHandler = () => {
    navigate("/login");
  };
  const buttonHandler2 = () => {
    navigate("/course");
  };
  const titleHandler = (e) => {
    // object 的 spread syntax (更新 courseData 的屬性值)
    setCourseData({ ...courseData, title: e.target.value });
  };
  const descriptionHandler = (e) => {
    setCourseData({ ...courseData, description: e.target.value });
  };
  const pricetionHandler = (e) => {
    setCourseData({ ...courseData, price: e.target.value });
  };
  const updateHandler = async () => {
    try {
      await CourseService.updateCourse(
        courseID,
        courseData.title,
        courseData.description,
        courseData.price
      );

      window.alert("更新成功，您將被導向到課程頁面");
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
          <h2>在更新課程之前，您必須先登錄。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler}>
            回到登入頁面
          </button>
        </div>
      )}

      {/* 已登入，但是是以學生身分 */}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <h2>只有身分是導師的用戶，可以更新課程。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler2}>
            回到課程頁面
          </button>
        </div>
      )}

      {/* 已登入，且是以導師身分，但並非新增課程的導師 */}
      {currentUser && currentUser.user._id !== instructorID && (
        <div>
          <h2>只有新增課程的該導師，可以更新課程。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler2}>
            回到課程頁面
          </button>
        </div>
      )}

      {currentUser &&
        currentUser.user.role === "instructor" &&
        currentUser.user._id === instructorID && (
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
                defaultValue={courseData.title}
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
                defaultValue={courseData.description}
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
                defaultValue={courseData.price}
                onChange={pricetionHandler}
              />
              <br />
              <button className="btn btn-success" onClick={updateHandler}>
                更新課程
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default UpdateCourse;
