import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  href?: never;
  children: ReactNode;
  textOnly: boolean;
} & ComponentPropsWithoutRef<'button'>;

type AnchorProps = {
  href?: string;
  children: ReactNode;
  textOnly: boolean;
} & ComponentPropsWithoutRef<'a'>;

type ButtonOrAnchorProps = ButtonProps | AnchorProps;

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

export default function Button(props: ButtonOrAnchorProps) {
  const className = props.textOnly
    ? `${styles.button} ${styles.buttonTextOnly}`
    : styles.button;

  if (isAnchorProps(props))
    return (
      <a className={className} {...props}>
        {props.children}
      </a>
    );

  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
}
