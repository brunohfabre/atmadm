import axios from "axios";

const api = axios.create({
  baseURL: "http://atmsender.atmsistema.com.br/"
});

export default api;
