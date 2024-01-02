import React from "react";
import Modal from 'react-modal';
import AppointmentForm from "../components/AppointmentForm";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Appointment Form Modal"
      className="Modal"
      overlayClassName="Overlay fixed inset-0 flex items-center justify-center"
    >
      <div className="modal-container p-6 bg-teal-100 rounded-md shadow-md max-w-xl mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-gray-700 cursor-pointer"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Appointment</h2>
        <AppointmentForm onSubmit={onSubmit} />
      </div>
    </Modal>
  );
};

export default AppointmentModal;
