import axios from "axios";

const USER_API_BASE_REGISTRATION_URL = "http://localhost:8081/api/v1/auth/registration"
const USER_API_BASE_AUTHEN_URL = "http://localhost:8081/api/v1/auth/authenticate"

interface User {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
  }
  interface Authen {
    email: string;
    password: string;
}  
class UserService {

    saveUser(user:User){
        return axios.post(USER_API_BASE_REGISTRATION_URL,user)
    }
    authUser(authen:Authen){
        return axios.post(USER_API_BASE_AUTHEN_URL,authen)
    }

} export default new UserService();
