import axios from "axios";

const Axios = axios.create({
  url:
    "https://api.addressy.com/BankAccountValidation/Interactive/Validate/v2.00/json3.ws",
  params: {},
});

Axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Axios;
