import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';

import clsx from 'clsx';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  hiddenCross?: boolean;
  hiddenHeader?: boolean;
  paddingTop?: number;
}

export const AuthMobileModal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  hiddenCross,
  hiddenHeader = false,
  paddingTop = 62,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      setIsOpenModal(true);
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      setTimeout(() => {
        setIsOpenModal(false);
      }, 100);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const modalRoot = document.getElementById('portal-root');

  if ((!isOpen && !isOpenModal) || !modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className="fixed left-0 right-0 bottom-0 z-20 h-full"
      style={{ top: hiddenHeader ? 0 : paddingTop }}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className={clsx(
          `bg-background overflow-y-scroll w-full h-full relative shadow-lg transition-all`,
          { 'scale-100': isOpenModal, 'scale-75': !isOpenModal }
        )}
        onClick={e => e.stopPropagation()}
      >
        {!hiddenCross && (
          <button
            onClick={onClose}
            className="absolute top-3 right-4 z-10 p-2 text-black bg-transparent hover:text-primary"
            aria-label="Close Modal"
          >
            <RxCross2 className="w-8 h-8" />
          </button>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};
