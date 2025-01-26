import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  href?: never;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

type AnchorProps = {
  href?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'a'>;

type ButtonOrAnchorProps = ButtonProps | AnchorProps;

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

export default function Button(props: ButtonOrAnchorProps) {
  if (isAnchorProps(props))
    return (
      <a className={styles.button} {...props}>
        {props.children}
      </a>
    );

  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
}
