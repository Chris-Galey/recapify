import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Customize.module.css";

export default function Customize({ customState, onCustomStateChange }) {
  const { recapId } = useParams();
  const initialCustomState = {
    summarization: true,
    summary_type: "bullets",
    summary_model: "informative",
    entity_detection: false,
  };
  useEffect(() => {
    onCustomStateChange(initialCustomState);
  }, [recapId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.custom_header}>
        <h2>Customize</h2>
      </div>

      <div className={styles.custom_form}>
        <div className={styles.form__summarize}>
          <div className={styles.form__summarize_check}>
            <label htmlFor="summary">Summary: </label>
            <input
              type="checkbox"
              id="summary"
              checked={customState.summarization}
              onChange={(e) => {
                onCustomStateChange({
                  ...customState,
                  summarization: e.target.checked,
                });
              }}
            />
          </div>

          <label htmlFor="summary-type">Type:</label>
          <select
            name="summary-type"
            id="summary-type"
            value={customState.summary_type}
            onChange={(e) => {
              onCustomStateChange({
                ...customState,
                summary_type: e.target.value,
              });
            }}
          >
            <option value="bullets" id="bullets">
              bullets
            </option>
            <option value="paragraph" id="paragraph">
              paragraph
            </option>
          </select>

          <label htmlFor="summary-model">Model:</label>
          <select
            name="summary-model"
            id="summary-model"
            value={customState.summary_model}
            onChange={(e) => {
              onCustomStateChange({
                ...customState,
                summary_model: e.target.value,
              });
            }}
          >
            <option value="informative" id="informative">
              Informative
            </option>
            <option value="conversational" id="conversational">
              Conversational
            </option>
          </select>
        </div>
        <div className={styles.form_keyword}>
          <label htmlFor="keywords">Key Information:</label>
          <input
            type="checkbox"
            id="keywords"
            value={customState.entity_detection}
            onChange={(e) => {
              onCustomStateChange({
                ...customState,
                entity_detection: e.target.checked,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
