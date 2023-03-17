import axios from "axios";

const api = axios.create({
  baseURL: "https://apicourses.azurewebsites.net/",
});

export { api };
