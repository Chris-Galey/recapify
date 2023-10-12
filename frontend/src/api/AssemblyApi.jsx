import axios from "axios";
// import { useState } from "react";

const api_token = "72a3bd6a64304298b16f08870cf96698";
const baseUrl = "https://api.assemblyai.com/v2";

export const createUrlApi = async (selectedFile) => {
  const headers = {
    authorization: "72a3bd6a64304298b16f08870cf96698",
  };

  const formData = new FormData();
  formData.append("audio", selectedFile);
  console.log(formData);
  const uploadResponse = await axios.post(`${baseUrl}/upload`, formData, {
    headers,
  });
  console.log("Upload Response:", uploadResponse);
  const uploadUrl = uploadResponse.data.upload_url;
  console.log(uploadUrl);
  return uploadUrl;
};

export const transcriptResultApi = async (audioUrl) => {
  const headers = {
    authorization: api_token,
    "content-type": "application/json",
  };
  const data = {
    audio_url: audioUrl,
    summarization: true,
    summary_model: "informative",
    summary_type: "bullets_verbose",
  };
  try {
    // Send the request to create a transcript with summarization
    const response = await axios.post(`${baseUrl}/transcript`, data, {
      headers,
    });
    const transcriptId = response.data.id;
    const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;
    const maxPollingAttempts = 5; // Adjust as needed
    let pollingAttempts = 0;

    while (pollingAttempts < maxPollingAttempts) {
      const pollingResponse = await axios.get(pollingEndpoint, { headers });
      const transcriptionResult = pollingResponse.data;

      if (transcriptionResult.status === "completed") {
        return transcriptionResult;
      } else if (transcriptionResult.status === "error") {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
