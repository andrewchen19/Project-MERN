import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course_service";

const EnrollCourse = ({ currentUser }) => {
  // navigate
  const navigate = useNavigate();

  // state
  // React 要求在使用 state 時，狀態的初始值必須是有效的，不能是 null 或 undefined
  let [searchInput, setSearchInput] = useState("");
  let [courseData, setCourseData] = useState([]);
  console.log(courseData);
  // 用來處理錯誤訊息
  let [message, setMessage] = useState("");

  // useEffect (第一次渲染時，就先執行一次裡面的 callback)
  useEffect(() => {
    async function execution() {
      try {
        let response = await CourseService.findAllCourse();
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
  const inputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const searchHandler = async () => {
    try {
      let response = await CourseService.findCourseByName(searchInput);

      // console.log(response);
      setCourseData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const enrollHandler = async (e) => {
    try {
      // 在 <button> 標籤有設定 id 屬性，所以可以拿到該課程的 id
      await CourseService.enrollCourse(e.target.id);

      window.alert("註冊成功，您將被導向到課程頁面");
      // 重新導向
      navigate("/course");
    } catch (err) {
      // console.log(err);
      setMessage(err.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }}>
      {/* 特殊情況的 logical operation */}
      {!currentUser && (
        <div>
          <h2>在註冊課程之前，您必須先登錄。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler}>
            回到登入頁面
          </button>
        </div>
      )}

      {/* 已登入，但是是以導師身分 */}
      {currentUser && currentUser.user.role !== "student" && (
        <div>
          <h2>只有身分是學生的用戶，可以註冊課程。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler2}>
            回到課程頁面
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role === "student" && (
        <div className="search input-group mb-3">
          <input type="text" className="form-control" onChange={inputHandler} />
          <button onClick={searchHandler} className="btn btn-primary">
            搜尋課程
          </button>
        </div>
      )}

      {/* 只有以導師身分登入的使用者可以看到這些課程資料 */}
      {/* 當沒有課程資料時，courseData 是 empty array (truthy value)，且是無效內容的 expression (不會顯示) */}
      {/* 但第三個 operand 是 false (flasy value)，且 boolean 是無效內容的 expression (不會顯示) */}
      {currentUser &&
        currentUser.user.role === "student" &&
        courseData.length !== 0 && (
          <div>
            <h3>以下是我們所有的課程：</h3>

            {message && <div className="alert alert-danger">{message}</div>}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              {courseData.map((course) => {
                return (
                  <div
                    key={course._id}
                    className="card border-info"
                    style={{ width: "16rem", margin: "0 2rem 1rem 0" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">課程名稱：{course.title}</h5>
                      <p
                        style={{ margin: "0.5rem 0rem" }}
                        className="card-text"
                      >
                        {course.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        學生人數：{course.students.length}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程價格：{course.price}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        導師：{course.instructor.username}
                      </p>
                      <button
                        className="btn btn-outline-primary"
                        // 設定 id 屬性
                        id={course._id}
                        onClick={enrollHandler}
                      >
                        註冊課程
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
};

export default EnrollCourse;
