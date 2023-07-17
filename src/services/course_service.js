// 任何與課程相關的操作，都會來這個服務器處理

import axios from "axios";

const API_URL = "http://localhost:8080/api/course";

class CourseService {
  // 用「導師」id 尋找導師所新增過的課程
  getInsructorCourses(_id) {
    // 到 course 相關的 routes，要先通過 jwt 策略的身分驗證
    // 因此記得在 headers 附加 Authorization 屬性 & token (否則會 Unauthorized)
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }

  // 用「學生」id 尋找學生所註冊過的課程
  getStudentCourses(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student/" + _id, {
      headers: { Authorization: token },
    });
  }

  // 「新增」課程
  createCourse(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { title, description, price },
      { headers: { Authorization: token } }
    );
  }

  // 所有課程
  findAllCourse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: { Authorization: token },
    });
  }

  // 用課程「名稱」尋找特定課程
  findCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  // 用課程 id「註冊」課程
  enrollCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    // axios.post() 前兩個參數 url & data 必填
    // 所以就算沒有數據要發送，還是要寫 {}
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      { headers: { Authorization: token } }
    );
  }

  // 「更新」特定課程
  updateCourse(_id, title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/" + _id,
      { title, description, price },
      { headers: { Authorization: token } }
    );
  }

  // 用課程「id」尋找特定課程
  findCourseById(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + _id, {
      headers: { Authorization: token },
    });
  }

  //「刪除」特定課程
  deleteCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: { Authorization: token },
    });
  }
}

// 將 instance 作為導出的對象
// 所以當其他地方導入時，就可以直接使用該 instance & class methods
export default new CourseService();
