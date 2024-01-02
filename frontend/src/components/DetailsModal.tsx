import React from "react";
import Modal from 'react-modal';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: any;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, appointment }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Appointment Details Modal"
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
        <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
        {appointment && (
          <div>
            <p>Name: {appointment.name}</p>
            <p>Age: {appointment.age}</p>
            <p>Date: {appointment.date}</p>
            <p>Gender: {appointment.gender}</p>
            <p>Time: {appointment.time}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DetailsModal;
