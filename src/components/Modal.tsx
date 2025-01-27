import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ModalHandle } from '../types/modal';

const Modal = forwardRef<ModalHandle, { children: React.ReactNode }>(
  function Modal({ children }, ref) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open() {
        dialogRef.current?.showModal();
      },
      close() {
        dialogRef.current?.close();
      },
    }));

    return <dialog ref={dialogRef}>{children}</dialog>;
  }
);

export default Modal;
