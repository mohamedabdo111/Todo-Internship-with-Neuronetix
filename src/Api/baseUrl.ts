import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://todolistapp.runasp.net/api",
});

export default baseUrl;
