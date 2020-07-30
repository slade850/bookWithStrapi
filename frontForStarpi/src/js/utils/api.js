import axios from 'axios'; 

const instance = axios.create({
    baseURL: "http://localhost:1337/",
  });
export const addAuth = (token) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  };


export default instance;