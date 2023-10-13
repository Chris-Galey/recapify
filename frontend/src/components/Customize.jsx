import { useState } from "react";
import styles from "../styles/Customize.module.css";
export default function Customize() {
  const [summary, setSummary] = useState(false);
  const [keywords, setKeywords] = useState(false);
  const [sentiment, setSentiment] = useState(false);
  const [labelSpeakers, setLabelSpeakers] = useState(false);
  const [type, setType] = useState("");
  const [model, setModel] = useState("");

  console.log(summary);
  return (
    <div className={styles.wrapper}>
      <h1>Customize</h1>

      <div className={styles.form}>
        <div className={styles.form__summarize}>
          <label htmlFor="summary">
            Summary:{" "}
            <input
              type="checkbox"
              id="summary"
              onChange={(e) => {
                setSummary(e.target.checked);
              }}
            />
          </label>
          <label htmlFor="summary-type">
            Type:
            <select name="summary-type" id="summary-type">
              <option value="1" id="paragraph">
                Paragraph
              </option>
              <option value="2" id="bullets">
                bullets
              </option>
            </select>
          </label>
          <label htmlFor="summary-model">
            Model:
            <select name="summary-model" id="summary-model">
              <option value="1" id="informative">
                Informative
              </option>
              <option value="2" id="conversation">
                Conversational
              </option>
            </select>
          </label>
        </div>

        <label htmlFor="keywords">
          Keywords:
          <input type="checkbox" id="keywords" />
        </label>
        <label htmlFor="sentiment">
          Sentiment:
          <input type="checkbox" id="sentiment" />
        </label>
        <label htmlFor="Label Speakers">
          Label Speakers:
          <input type="checkbox" id="Label Speakers" />
        </label>
      </div>
    </div>
  );
}
