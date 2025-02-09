import { ReactNode } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from './MissionBox.module.css';

type MissionBoxProps = {
  img: string;
  alt: string;
  children: ReactNode;
};

function MissionBox({ img, alt, children }: MissionBoxProps) {
  return (
    <div className={styles.missionBox}>
      <LazyLoadImage
        src={img}
        alt={alt}
        className={styles.img}
        effect="blur"
        width="100%"
        height="100%"
      />
      <p className={styles.p}>{children}</p>
    </div>
  );
}

export default MissionBox;
