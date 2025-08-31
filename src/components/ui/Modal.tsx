import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';

import clsx from 'clsx';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  hiddenCross?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  hiddenCross,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      setIsOpenModal(true);
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
      document.body.style.paddingRight = ''; // Reset padding
      setTimeout(() => {
        setIsOpenModal(false);
      }, 100);
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount or modal close
      document.body.style.paddingRight = ''; // Cleanup padding
    };
  }, [isOpen]);

  useEffect(() => {
    if (onClose) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpenModal(false);
          // Slow close modal
          setTimeout(() => {
            onClose();
          }, 100);
        }
      };
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      } else {
        document.removeEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const modalRoot = document.getElementById('portal-root');

  if ((!isOpen && !isOpenModal) || !modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className={clsx(`fixed inset-0 z-50 flex items-center justify-center`)}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div
        className={clsx(
          `fixed inset-0 bg-slate-500 bg-opacity-50 transition-all duration-300 ease-in-out`,
          {
            'backdrop-blur-md': isOpenModal,
            'backdrop-none': isOpenModal,
          }
        )}
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        className={clsx(
          `relative z-10 rounded-[20px] shadow-lg bg-white transition-all`,
          { 'scale-100': isOpenModal, 'scale-75': !isOpenModal }
        )}
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {!hiddenCross && (
          <button
            onClick={onClose}
            className="absolute top-0 lg:top-3 right-0 lg:right-4 z-10 p-2 text-black bg-transparent hover:text-primary focus:outline-none"
            aria-label="Close Modal"
          >
            <RxCross2 className="w-6 lg:w-8 h-6 lg:h-8" />
          </button>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};
