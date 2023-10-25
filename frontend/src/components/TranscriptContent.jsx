export default function TranscriptContent({
  transcript,
  confidence,
  autoHighlights,
}) {
  const highlightPhrases = autoHighlights.results.map((highlight) => {
    return highlight.text || "";
  });
  const words = transcript.split(" ");

  return (
    <div className="transcript">
      <div>
        <p>{confidence}</p>
      </div>
      {words.map((word, index) => {
        const matchedPhraseIndex = highlightPhrases.findIndex(
          (phrase) => phrase.split(" ")[0] === word
        );

        if (matchedPhraseIndex !== -1) {
          const matchedPhrase = highlightPhrases[matchedPhraseIndex];
          const phraseWords = matchedPhrase.split(" ");
          let isHighlighted = true;

          for (let i = 1; i < phraseWords.length; i++) {
            if (words[index + i] !== phraseWords[i]) {
              isHighlighted = false;
              break;
            }
          }

          if (isHighlighted) {
            return (
              <span key={index} className="highlighted">
                {phraseWords.map((phraseWord, i) => (
                  <span key={i} className="highlighted-word">
                    {phraseWord}
                  </span>
                ))}
              </span>
            );
          }
        }

        return (
          <span key={index} className="highlighted">
            {word}{" "}
          </span>
        );
      })}
    </div>
  );
}
