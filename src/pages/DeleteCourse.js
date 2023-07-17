import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course_service";

const DeleteCourse = ({ currentUser, courseID, instructorID }) => {
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
  const deleteHandler = async () => {
    try {
      await CourseService.deleteCourse(courseID);

      window.alert("刪除成功，您將被導向到課程頁面");
      // 重新導向
      navigate("/course");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }}>
      {/* 特殊情況的 logical operation */}
      {!currentUser && (
        <div>
          <h2>在刪除課程之前，您必須先登錄。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler}>
            回到登入頁面
          </button>
        </div>
      )}

      {/* 已登入，但是是以學生身分 */}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <h2>只有身分是導師的用戶，可以刪除課程。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler2}>
            回到課程頁面
          </button>
        </div>
      )}

      {/* 已登入，且是以導師身分，但並非新增課程的導師 */}
      {currentUser && currentUser.user._id !== instructorID && (
        <div>
          <h2>只有新增課程的該導師，可以刪除課程。</h2>
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
            <h2>以下是您即將要刪除的課程資訊：</h2>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <strong>課程名稱：{courseData.title}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>課程內容：{courseData.description}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>課程價格：{courseData.price}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <h2>您是否確定要刪除此課程?</h2>
            <br />
            <button className="btn btn-danger" onClick={deleteHandler}>
              刪除課程
            </button>
          </div>
        )}
    </div>
  );
};

export default DeleteCourse;
