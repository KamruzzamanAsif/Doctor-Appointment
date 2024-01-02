import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-white text-xl font-semibold">
          Doctor Appointment Monthly Calendar View
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
