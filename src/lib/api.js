import axios from "axios";

// Shared axios instance for all client-side calls to this app's own
// /api/* routes. Relative baseURL means it works the same in dev,
// Docker, and any deployed domain without extra config.
const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export default api;