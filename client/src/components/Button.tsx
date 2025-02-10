import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  href?: never;
  children: ReactNode;
  textOnly?: boolean;
  noBorder?: boolean;
} & Omit<ComponentPropsWithoutRef<'button'>, 'textOnly'>;

type AnchorProps = {
  href?: string;
  children: ReactNode;
  textOnly?: boolean;
  noBorder?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'textOnly'>;

type ButtonOrAnchorProps = ButtonProps | AnchorProps;

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

export default function Button(props: ButtonOrAnchorProps) {
  const { textOnly, children, noBorder, ...otherProps } = props;

  const className = textOnly
    ? `${styles.button} ${styles.buttonTextOnly}`
    : `${styles.button}`;

  if (isAnchorProps(props))
    return (
      <a
        className={className}
        style={noBorder ? { borderBottom: 'none' } : {}}
        {...(otherProps as ComponentPropsWithoutRef<'a'>)}
      >
        {children}
      </a>
    );

  return (
    <button
      className={className}
      style={noBorder ? { borderBottom: 'none', padding: '1rem' } : {}}
      {...(otherProps as ComponentPropsWithoutRef<'button'>)}
    >
      {children}
    </button>
  );
}
