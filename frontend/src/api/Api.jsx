const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const header = {
    "Content-Type": "application/json",
    Authorization: `token ${tokenString}`,
  };
  return header;
};
const getTokenAlternative = () => {
  const tokenString = localStorage.getItem("token");
  const header = {
    Authorization: `Token ${tokenString}`,
  };
  return header;
};
const baseUrl = import.meta.env.VITE_BASE_URL;
// Auth
export const signup = async (username, password) => {
  const data = await fetch(`http://${baseUrl}/dashboard/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const res = await data.json();
  return res;
};
export const login = async (username, password) => {
  const data = await fetch(`http://${baseUrl}/dashboard/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const res = await data.json();
  return res;
};

// Recap
export const getRecaps = async () => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/`, {
    method: "GET",
    headers: header,
  });
  const res = await data.json();
  return res;
};

export const postRecap = async (title, description) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ title, description }),
  });
  const res = await data.json();
  return res;
};

// Recap Detail
export const getRecapDetail = async (recapId) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/${recapId}/`, {
    method: "GET",
    headers: header,
  });
  const res = await data.json();
  return res;
};

export const updateRecapDetail = async (recapId, title, description) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/${recapId}/`, {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ title, description }),
  });
  const res = await data.json();
  return res;
};

export const deleteRecapDetail = async (recapId) => {
  const header = getToken();
  const response = await fetch(`http://${baseUrl}/recaps/${recapId}/`, {
    method: "DELETE",
    headers: header,
  });
  return response;
};

// Transcript
export const getTranscript = async (recapId) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/${recapId}/transcript/`, {
    method: "GET",
    headers: header,
  });
  if (!data.ok) {
    return "No Transcript ";
  }
  const res = await data.json();
  return res;
};

export const updateTranscript = async (recapId, raw_transcript) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/${recapId}/transcript/`, {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ raw_transcript }),
  });
  const res = await data.json();
  return res;
};

// Summary

export const getSummary = async (recapId) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/${recapId}/summary/`, {
    method: "GET",
    headers: header,
  });
  if (!data.ok) {
    return "No Summary";
  }
  const res = await data.json();
  return res;
};

export const updateSummary = async (recapId, content) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/${recapId}/summary/`, {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ content }),
  });
  const res = await data.json();
  return res;
};

// Assembly API

export const assemblyGenerateUrl = async (file) => {
  const header = getTokenAlternative();
  const formData = new FormData();
  formData.append("audio", file);
  const data = await fetch(`http://${baseUrl}/recaps/generateUrl/`, {
    method: "POST",
    headers: header,
    body: formData,
  });
  const res = await data.json();
  console.log(res);
  return res;
};

export const assemblyGenerateTranscript = async (url, customState) => {
  const header = getToken();
  const data = await fetch(`http://${baseUrl}/recaps/generateTranscript/`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ url, customState }),
  });
  const res = await data.json();
  return res;
};
