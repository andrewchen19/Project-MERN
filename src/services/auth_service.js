// 任何與驗證身分相關的操作，都會來這個服務器處理

import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

class AuthService {
  // 註冊用戶
  register(username, email, password, role) {
    // return Promise object
    // 第二個參數是個 object，代表要發送到伺服器的資料
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  // 用戶登入
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  // 拿取儲存在 local storage 的 data
  // localStorage 沒找到名為 "user" 的項目時，return null
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // 用戶登出
  // 刪除儲存在 local storage 的 data
  logout() {
    localStorage.removeItem("user");
  }
}

// 將 instance 作為導出的對象
// 所以當其他地方導入時，就可以直接使用該 instance & class methods
export default new AuthService();
