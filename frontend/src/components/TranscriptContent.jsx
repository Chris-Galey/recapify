export default function TranscriptContent({
  transcript,
  confidence,
  autoHighlights,
}) {
  const highlightPhrases = autoHighlights.results.map((highlight) => {
    return highlight.text || "";
  });

  const highlightedTranscript = () => {
    let transcriptCopy = transcript;

    highlightPhrases.forEach((phrase) => {
      const regex = new RegExp(`\\b${phrase}\\b`, "g");
      transcriptCopy = transcriptCopy.replace(
        regex,
        (match) => `<span class="highlighted">${match}</span>`
      );
    });

    return { __html: transcriptCopy };
  };

  return (
    <div className="transcript">
      <div>
        <p>Confidence: {confidence.toFixed(2) * 100 + "%"}</p>
      </div>
      <div dangerouslySetInnerHTML={highlightedTranscript()} />
    </div>
  );
}
