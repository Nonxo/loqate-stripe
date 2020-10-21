import axios from "axios";

export default axios.create({
  baseURL:
    "https://api.addressy.com/BankAccountValidation/Interactive/Validate/v2.00",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  method: "post",
});
