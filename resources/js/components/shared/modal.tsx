const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: Function, title: string, children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
        // Modal Overlay (Backdrop)
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300 backdrop-blur-sm"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Modal Dialog Box */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100 opacity-100 sm:my-8 sm:align-middle">

                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Close modal"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 text-gray-700 dark:text-gray-300">
                    {children}
                </div>

                {/* Modal Footer (Action buttons) */}
                <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose} // Typically performs an action
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Confirm Action
                    </button>
                </div>
            </div>
        </div>
    );
};


const CloseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

export default Modal;