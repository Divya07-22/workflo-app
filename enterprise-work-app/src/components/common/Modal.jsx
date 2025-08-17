// Import React and Fragment for JSX rendering
import React, { Fragment } from 'react';

// Import Dialog and Transition components from Headless UI
//   - Dialog: provides accessible modal structure
//   - Transition: handles smooth animations when opening/closing the modal
import { Dialog, Transition } from '@headlessui/react';

// Import an icon for the close (X) button
import { XMarkIcon } from '@heroicons/react/24/outline';

// Define the Modal component
// Props:
//   - isOpen → Boolean that controls whether modal is shown or hidden
//   - onClose → Function called when modal should close
//   - title → The heading text displayed at the top of the modal
//   - children → Any content that should appear inside the modal
const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    // Transition wrapper to animate modal when it appears/disappears
    <Transition appear show={isOpen} as={Fragment}>
      
      {/* Dialog is the root of the modal (handles accessibility, ARIA, focus trap) */}
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        
        {/* Transition for the background overlay (fade in/out effect) */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"    // Smooth fade in over 300ms
          enterFrom="opacity-0"           // Start fully transparent
          enterTo="opacity-100"           // End fully visible
          leave="ease-in duration-200"    // Smooth fade out over 200ms
          leaveFrom="opacity-100"         // Start fully visible
          leaveTo="opacity-0"             // End fully transparent
        >
          {/* Semi-transparent black background behind modal */}
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        {/* Modal container (positions modal in center of screen) */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            
            {/* Transition for the actual modal panel (scale + fade animation) */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"   // Enter animation timing
              enterFrom="opacity-0 scale-95"  // Start slightly smaller + transparent
              enterTo="opacity-100 scale-100" // End fully visible + normal size
              leave="ease-in duration-200"    // Leave animation timing
              leaveFrom="opacity-100 scale-100" // Start fully visible
              leaveTo="opacity-0 scale-95"    // End smaller + transparent
            >
              {/* The main modal box */}
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                
                {/* Modal title */}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {title}
                </Dialog.Title>

                {/* Close button (X) at top-right corner */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Modal body content (passed via children) */}
                <div className="mt-4">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// Export Modal so it can be reused anywhere in the app
export default Modal;
