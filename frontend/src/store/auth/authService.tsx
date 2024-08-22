import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/auth/`;


interface UserData {
  email: string;
  password: string;
}


const register = async (userData:UserData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const login = async (userData:UserData) => {
 const response = await axios.post(API_URL + "login", userData);
  return response.data;
};


const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data;
};

const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus");
    return response.data;
  };

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
  };
  
  export default authService;