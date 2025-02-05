import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  href?: never;
  children: ReactNode;
  textOnly?: boolean;
} & Omit<ComponentPropsWithoutRef<'button'>, 'textOnly'>;

type AnchorProps = {
  href?: string;
  children: ReactNode;
  textOnly?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'textOnly'>;

type ButtonOrAnchorProps = ButtonProps | AnchorProps;

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

export default function Button(props: ButtonOrAnchorProps) {
  const { textOnly, children, ...otherProps } = props;

  const className = textOnly
    ? `${styles.button} ${styles.buttonTextOnly}`
    : `${styles.button}`;

  if (isAnchorProps(props))
    return (
      <a
        className={className}
        {...(otherProps as ComponentPropsWithoutRef<'a'>)}
      >
        {children}
      </a>
    );

  return (
    <button
      className={className}
      {...(otherProps as ComponentPropsWithoutRef<'button'>)}
    >
      {children}
    </button>
  );
}
