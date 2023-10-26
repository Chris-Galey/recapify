import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className={styles.home_wrapper}>
      <div className={styles.hero_header}>
        <h1 className={styles.heading_home}>Introducing Recapify</h1>
      </div>
      <div className={styles.features}>
        <h3>Features</h3>
        <div className={styles.feature}>
          <h3>Recap Audio</h3>
          <p>
            Transform lengthy audio files into concise, actionable summaries.
            Recapify has intelligent algorithms to capture the essence of your
            discussions, ensuring you never miss a crucial point.
          </p>
        </div>
        <div className={styles.feature}>
          <h3>Effortless Storage</h3>
          <p>
            Store all your meeting transcripts securely in one place. Easily
            access past meetings whenever you need to reference key information.
          </p>
        </div>
        <div className={styles.feature}>
          <h3>Customization</h3>
          <p>
            Tailor your recaps to fit your unique needs. Choose the type of
            summary, highlights, and models you want to emphasize.
          </p>
        </div>
      </div>
    </div>
  );
}
