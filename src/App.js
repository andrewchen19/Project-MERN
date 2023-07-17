import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Proflie from "./pages/Profile";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";
import DeleteCourse from "./pages/DeleteCourse";
import EnrollCourse from "./pages/EnrollCourse";
import UpdateCourse from "./pages/UpdateCourse";
import Page404 from "./pages/Page404";
// main rendering stylesheet 是放在 App component，負責渲染所有其他組件
import "./styles/style.css";
// 導入 instance
import AuthService from "./services/auth_service";

function App() {
  // state
  // App.js 當中的 router 在處理 state passing 比較特別
  // 當跳轉到其他頁面並重整 (譬如從 profile 頁面到其他的頁面，然後按重新整理頁面)
  // 狀態的值會從宣告 (instantiation) 的位置重新獲取

  // 一開始都是 null，直到有人登入 (localStorage 才會有資料) (在 Login.js 處理)
  // 直到有人登出，再變更回 null (在 Nav.js 處理)
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  console.log(currentUser);

  let [courseID, setCourseID] = useState("");
  let [instructorID, setInstructorID] = useState("");
  console.log(courseID);
  console.log(instructorID);

  let deletePath = `/course/delete/${courseID}`;
  let updatePath = `/course/update/${courseID}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<Homepage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          ></Route>
          <Route
            path="/profile"
            element={<Proflie currentUser={currentUser} />}
          ></Route>
          <Route
            path="/course"
            element={
              <Course
                currentUser={currentUser}
                setCourseID={setCourseID}
                setInstructorID={setInstructorID}
              />
            }
          ></Route>
          <Route
            path="/course/create"
            element={<CreateCourse currentUser={currentUser} />}
          ></Route>
          <Route
            path="/course/enroll"
            element={<EnrollCourse currentUser={currentUser} />}
          ></Route>
          <Route
            path={deletePath}
            element={
              <DeleteCourse
                currentUser={currentUser}
                courseID={courseID}
                instructorID={instructorID}
              />
            }
          ></Route>
          <Route
            path={updatePath}
            element={
              <UpdateCourse
                currentUser={currentUser}
                courseID={courseID}
                instructorID={instructorID}
              />
            }
          ></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
