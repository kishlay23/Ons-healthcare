const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch {
    return null;
  }
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Token expired — try to refresh once, then retry the original request
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      (headers as Record<string, string>)["Authorization"] =
        `Bearer ${newToken}`;
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    }
  }

  // Still 401 after refresh attempt — clear auth and redirect to login
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API error");
  }

  return response.json();
};

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email: string, password: string) =>
    apiCall("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signup: (data: Record<string, unknown>) =>
    apiCall("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logout: () => apiCall("/api/auth/logout", { method: "POST" }),
};

// ── Treatments ────────────────────────────────────────────────────────────────
export const treatmentAPI = {
  getAll: () => apiCall("/api/treatments"),
  getById: (id: string) => apiCall(`/api/treatments/${id}`),
};

// ── Appointments ──────────────────────────────────────────────────────────────
export const appointmentAPI = {
  getAvailableSlots: (date: string, therapistId: string) =>
    apiCall(`/api/available-slots?date=${date}&therapistId=${therapistId}`),
  create: (data: Record<string, unknown>) =>
    apiCall("/api/bookings", { method: "POST", body: JSON.stringify(data) }),
  getPatientAppointments: () => apiCall("/api/bookings/patient"),
  cancel: (id: string) => apiCall(`/api/bookings/${id}`, { method: "DELETE" }),
};

// ── Stories ───────────────────────────────────────────────────────────────────
export const storyAPI = {
  getAll: () => apiCall("/api/stories"),
  getById: (id: string) => apiCall(`/api/stories/${id}`),
  submit: (data: Record<string, unknown>) =>
    apiCall("/api/stories", { method: "POST", body: JSON.stringify(data) }),
};
