import { ReactNode } from 'react';
import styles from './MissionBox.module.css';

type MissionBoxProps = {
  img: string;
  alt: string;
  children: ReactNode;
};

function MissionBox({ img, alt, children }: MissionBoxProps) {
  return (
    <div className={styles.missionBox}>
      <img src={img} alt={alt} className={styles.img} />
      <p className={styles.p}>{children}</p>
    </div>
  );
}

export default MissionBox;
