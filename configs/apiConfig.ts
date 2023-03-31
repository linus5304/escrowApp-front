import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_REACT_APP_API_URL ?? "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});
