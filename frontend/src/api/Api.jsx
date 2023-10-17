const token = localStorage.getItem("token");
const header = {
  "Content-Type": "application/json",
  Authorization: `Token ${token}`,
}; // Recap
export const getRecaps = async () => {
  const data = await fetch("http://127.0.0.1:8000/recaps/", {
    method: "GET",
    headers: header,
  });
  const res = await data.json();
  return res;
};

export const postRecap = async (title, description) => {
  const data = await fetch("http://127.0.0.1:8000/recaps/", {
    method: "POST",
    headers: header,
    body: JSON.stringify({ title, description }),
  });
  const res = await data.json();
  return res;
};

// Recap Detail
export const getRecapDetail = async (recapId) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`, {
    method: "GET",
    headers: header,
  });
  const res = await data.json();
  return res;
};

export const updateRecapDetail = async (recapId, title, description) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`, {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ title, description }),
  });
  const res = await data.json();
  return res;
};

export const deleteRecapDetail = async (recapId) => {
  const response = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`, {
    method: "DELETE",
    headers: header,
  });
  return response;
};

// Transcript
export const getTranscript = async (recapId) => {
  const data = await fetch(
    `http://127.0.0.1:8000/recaps/${recapId}/transcript/`,
    {
      method: "GET",
      headers: header,
    }
  );
  if (!data.ok) {
    return "No Transcript ";
  }
  const res = await data.json();
  return res;
};

export const updateTranscript = async (recapId, raw_transcript) => {
  const data = await fetch(
    `http://127.0.0.1:8000/recaps/${recapId}/transcript/`,
    {
      method: "PUT",
      headers: header,
      body: JSON.stringify({ raw_transcript }),
    }
  );
  const res = await data.json();
  return res;
};

// Summary

export const getSummary = async (recapId) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/summary/`, {
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
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/summary/`, {
    method: "PUT",
    headers: header,
    body: JSON.stringify({ content }),
  });
  const res = await data.json();
  return res;
};

// Assembly API

export const assemblyGenerateUrl = async (file) => {
  const formData = new FormData();
  formData.append("audio", file);
  console.log(formData);
  const data = await fetch(`http://127.0.0.1:8000/recaps/generateUrl/`, {
    method: "POST",
    header: header,
    body: formData,
  });
  const res = await data.json();
  return res;
};

export const assemblyGenerateTranscript = async (url, customState) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/generateTranscript/`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ url, customState }),
  });
  const res = await data.json();
  return res;
};
