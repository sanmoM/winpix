import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  // Stop clicks inside modal from closing it
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    // Modal Overlay (Backdrop)
    <div
      onClick={onClose} // click on overlay closes modal
      className="fixed inset-0 bg-black/50 dark:bg-white/20 z-50 flex items-center justify-center p-4 transition-opacity duration-300 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Dialog Box */}
      <div
        onClick={handleModalClick} // prevent closing when clicking inside modal
        className="bg-bg-primary dark:bg-bg-primary rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden transform transition-all duration-300 sm:my-8 sm:align-middle"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white" id="modal-title">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-color"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
};

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default Modal;
