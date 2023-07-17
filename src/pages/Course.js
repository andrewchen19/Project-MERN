import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course_service";

const Course = ({ currentUser, setCourseID, setInstructorID }) => {
  // navigate
  const navigate = useNavigate();

  // state
  const [courseData, setCourseData] = useState([]);

  // useEffect (第一次渲染時，就先執行一次裡面的 callback)
  // useEffect 的 callback 不能是 async function
  useEffect(() => {
    // 把 async function 寫在 callback 裡面
    async function execution() {
      let _id;
      if (currentUser) {
        _id = currentUser.user._id;

        if (currentUser.user.role === "instructor") {
          try {
            let response = await CourseService.getInsructorCourses(_id);
            // console.log(response);
            setCourseData(response.data);
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            let response = await CourseService.getStudentCourses(_id);
            setCourseData(response.data);
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
    // 記得執行 async function
    execution();
  }, []);

  // event handling
  const buttonHandler = () => {
    navigate("/login");
  };
  const updateHandler = (e) => {
    // 在 <button> 標籤有設定 id 屬性，所以可以拿到該課程的 _id
    setCourseID(e.target.id);
    // 在 <button> 標籤有設定 "自定義" 的 instructorid 屬性，所以可以拿到該課程的 instructor 的 _id
    // 無法直接使用 e.target.instructorid (e.target 只能存取元素的標準屬性)，必須要加上 .getAttribute() 函式
    setInstructorID(e.target.getAttribute("instructorid"));
    navigate(`/course/update/${e.target.id}`);
  };
  const deleteHandler = (e) => {
    setCourseID(e.target.id);
    setInstructorID(e.target.getAttribute("instructorid"));
    navigate(`/course/delete/${e.target.id}`);
  };

  return (
    <div style={{ padding: "3rem", minHeight: "80vh" }}>
      {/* 特殊情況的 logical operation */}
      {!currentUser && (
        <div>
          <h2>在獲取您的個人相關課程之前，您必須先登入。</h2>
          <br />
          <button className="btn btn-primary btn-lg" onClick={buttonHandler}>
            回到登入頁面
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>歡迎來到導師 {currentUser.user.username} 的課程頁面</h1>
          <br />
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>歡迎來到學生 {currentUser.user.username} 的課程頁面</h1>
          <br />
        </div>
      )}

      {/* 有 currentUser 且是導師身分，但沒有課程資料時，顯示這行 */}
      {currentUser &&
        currentUser.user.role === "instructor" &&
        courseData.length === 0 && (
          <div>
            <h3>目前您沒有任何課程，您可以去新增課程</h3>
          </div>
        )}
      {/* 有 currentUser 且是學生身分，但沒有課程資料時，顯示這行 */}
      {currentUser &&
        currentUser.user.role === "student" &&
        courseData.length === 0 && (
          <div>
            <h3>目前您沒有任何課程，您可以去註冊課程</h3>
          </div>
        )}

      {/* 沒有課程資料時，courseData 是 empty array (truthy value)，且是無效內容的 expression (不會顯示) */}
      {/* 當有 currentUser 但沒有課程資料時，前兩個 operands 都是 truthy value */}
      {/* 但第三個 operand 是 false (flasy value)，且 boolean 是無效內容的 expression (不會顯示) */}
      {currentUser && courseData && courseData.length !== 0 && (
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
                className="card border-secondary"
                style={{ width: "16rem", margin: "0 2rem 1rem 0" }}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱：{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數：{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格：{course.price}
                  </p>
                  {/* 當身分為學生時，才會出現導師的名稱這行文字 */}
                  {currentUser.user.role === "student" && (
                    <p style={{ margin: "0.5rem 0rem" }}>
                      導師：{course.instructor.username}
                    </p>
                  )}

                  {/* 當身分為導師時，才會出現更新和刪除課程的按鈕 */}
                  {currentUser.user.role === "instructor" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="btn btn-outline-success"
                        // 設定 id 屬性 (標準屬性)
                        id={course._id}
                        // 設定 instructorid 屬性 (自定義屬性)
                        // 這邊必須再加上 _id，因為我們從後端是拿到 instructor 的 _id, username, email (有使用 .populate())
                        instructorid={course.instructor._id}
                        onClick={updateHandler}
                      >
                        更新課程
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        // 設定 id 屬性 (標準屬性)
                        id={course._id}
                        // 設定 instructorid 屬性 (自定義屬性)
                        instructorid={course.instructor._id}
                        onClick={deleteHandler}
                      >
                        刪除課程
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Course;
