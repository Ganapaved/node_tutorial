const API_BASE = "http://localhost:3000";

export const apiRequest = async (url, method = "GET", body = null, auth = false) => {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  return res.json();
};
