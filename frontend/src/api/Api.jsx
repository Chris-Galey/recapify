// Recap
export const getRecaps = async () => {
  const data = await fetch("http://127.0.0.1:8000/recaps/");
  const res = await data.json();
  return res;
};

export const postRecap = async (title, description) => {
  const data = await fetch("http://127.0.0.1:8000/recaps/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  const res = await data.json();
  return res;
};

// Recap Detail
export const getRecapDetail = async (recapId) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`);
  const res = await data.json();
  return res;
};

export const updateRecapDetail = async (recapId, title, description) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  const res = await data.json();
  return res;
};

export const deleteRecapDetail = async (recapId) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const res = await data.json();
  return res;
};

// Transcript
export const getTranscript = async (recapId) => {
  const data = await fetch(
    `http://127.0.0.1:8000/recaps/${recapId}/transcript/`
  );
  const res = await data.json();
  return res;
};

export const updateTranscript = async (recapId, transcript) => {
  const data = await fetch(
    `http://127.0.0.1:8000/recaps/${recapId}/transcript`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw_transcript: transcript }),
    }
  );
  const res = await data.json();
  return res;
};

// Summary

export const getSummary = async (recapId) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/summary/`);
  const res = await data.json();
  return res;
};

export const updateSummary = async (recapId, summary) => {
  const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/summary`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: summary }),
  });
  const res = await data.json();
  return res;
};
