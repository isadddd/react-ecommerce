export const login = async (username, password) => {
  let response;

  try {
    response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });
  } catch {
    const error = new Error("Unable to connect to server");
    error.code = "NETWORK_ERROR";
    throw error;
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Login failed");

    if (response.status === 400) {
      error.code = "INVALID_CREDENTIALS";
    } else if (response.status === 401) {
      error.code = "UNAUTHORIZED";
    } else if (response.status >= 500) {
      error.code = "SERVER_ERROR";
    } else {
      error.code = "LOGIN_FAILED";
    }

    throw error;
  }

  return data;
};

export const getCurrentUser = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("NO_ACCESS_TOKEN");
  }

  const response = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to get current user");

    if (response.status === 401) {
      error.code = "UNAUTHORIZED";
    } else {
      error.code = "GET_USER_FAILED";
    }

    throw error;
  }

  return data;
};
