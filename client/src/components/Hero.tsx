import styles from './Hero.module.css';

function Hero() {
  return (
    <main className={styles.styledhero}>
      <video className={styles.video} autoPlay muted loop>
        <source src="./homePage.mp4" type="video/mp4" />
      </video>
    </main>
  );
}

export default Hero;
