import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Calendar from "../components/Calender";
import DetailsModal from "../components/DetailsModal";
import AppointmentModal from "../components/AppointmentModal";


export default function Home() {
  const [selectedYear, setSelectedYear] = useState<number>(2021);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const navigate = useNavigate();
  
  const handleDateChange = (year: number, month: number) => {
    setSelectedYear(() => {
      navigate(`/year/${year}/month/${month}`);
      return year;
    });
    setSelectedMonth(() => month);

    ///*****filter appointments */
    // Retrieve appointments from localStorage
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    // Filter appointments based on the selected year and month
    const filteredAppointments = allAppointments.filter((appointment: any) => {
      const [appointmentYear, appointmentMonth] = appointment.date.split("-").map(Number);
      return (
        appointmentYear === year &&
        appointmentMonth === month
      );
    });

    // Update state with filtered appointments
    setFilteredAppointments(filteredAppointments);
    console.log("filtered appointments", filteredAppointments);
  };

  useEffect(() => {
    // Navigate to the default path when the component mounts
    navigate(`/year/${selectedYear}/month/${selectedMonth}`);

    // generate some random appointments
    const randomAppointments = generateRandomData(2000);
    localStorage.setItem("appointments", randomAppointments);
    console.log("appointments", localStorage.getItem("appointments"))
    handleDateChange(2021, 1);
  }, []); 


  /************************* appointment handling **********************/

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAppointmentSubmit = (data: any) => {
    // Handle the submitted data (e.g., send it to the server)
    console.log('Appointment data:', data);
  
    // Retrieve existing appointments from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  
    // Add the new appointment to the array
    const newAppointment = {
      name: data.name, 
      age: data.age,
      date: data.date,
      gender: data.gender,
      time: data.time,
    };
  
    const updatedAppointments = [...existingAppointments, newAppointment];
  
    // Save the updated array to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    console.log("appointments: ", localStorage.getItem('appointments'))
    // Close the modal
    closeModal();

    handleDateChange(selectedYear, selectedMonth);
  };

  const renderAppointmentModal = () => {
    return (
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAppointmentSubmit}
      />
    );
  };
  /************************* appointment handling ends *********///////////




  /***********details modal vars**********************/
  // New state for appointment details modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Function to open appointment details modal
  const openDetailsModal = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  // Function to close appointment details modal
  const closeDetailsModal = () => {
    setSelectedAppointment(null);
    setIsDetailsModalOpen(false);
  };

  const renderDetailsModal = () => {
    return (
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        appointment={selectedAppointment}
      />
    );
  };
  /***********details modal vars ends**********************/



  /*******************appointment showing*****************/
  const generateRandomData = (count: any) => {
    const appointments = [];
    const names = ["Alice", "Bob", "Charlie", "David", "Eva"];
    const genders = ["male", "female"];
  
    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAge = Math.floor(Math.random() * 20) + 20; // Random age between 20 and 40
      const randomYear = 2019 + Math.floor(Math.random() * 3); // Random year between 2019 and 2021
      const randomMonth = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
      const randomDay = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
      const randomGender = genders[Math.floor(Math.random() * genders.length)];
      const randomTime =
        Math.floor(Math.random() * 12) + 8 + ":" + Math.floor(Math.random() * 60);
  
      const appointment = {
        name: randomName,
        age: randomAge.toString(),
        date: `${randomYear}-${randomMonth}-${randomDay}`,
        gender: randomGender,
        time: randomTime,
      };
  
      appointments.push(appointment);
    }
  
    return JSON.stringify(appointments);
  };

  const renderGrid = () => {
    const grid = [];
    const daysInMonth = 30;
    const daysPerRow = 6;
  
    for (let day = 1; day <= daysInMonth; day += daysPerRow) {
      const row = [];
      for (let i = 0; i < daysPerRow; i++) {
        const currentDay = day + i;
  
        if (currentDay <= daysInMonth) {
          let filteredAppointmentsForDay = filteredAppointments.filter(
            (appointment: any) =>
              parseInt(appointment.date.split("-")[2]) === currentDay
          );
  
          // Sort appointments for the current day by time
          filteredAppointmentsForDay.sort((a:any, b:any) => {
            const timeA = a.time.replace(":", "");
            const timeB = b.time.replace(":", "");
            return parseInt(timeA) - parseInt(timeB);
          });
  
          row.push(
            <div
              key={currentDay}
              className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-4"
            >
              <div className="grid-box border border-gray-300 p-4 rounded-md mb-4 h-40 overflow-y-auto cursor-pointer">
                <p className="text-lg font-semibold mb-2">{currentDay}</p>
                <div className="space-y-2">
                  {filteredAppointmentsForDay.map((appointment: any, index) => (
                    <div
                      key={index}
                      // Make each appointment item clickable
                      onClick={() => openDetailsModal(appointment)}
                      className="appointment-item bg-gray-100 p-2 rounded-md shadow-sm mb-2"
                    >
                      <p className="text-sm font-medium">{appointment.name}</p>
                      <p className="text-xs text-gray-500">{appointment.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
      }
  
      grid.push(
        <div key={day} className="flex flex-wrap -mx-4">
          {row}
        </div>
      );
    }
  
    return grid;
  };
  
  /*******************appointment showing ends*****************/


  return (
    <>
      <Navbar/>
      <div className="flex justify-between items-center p-4">
        <Calendar onDateChange={handleDateChange} />

        <button
        onClick={openModal}
        className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Create Appointment
      </button>


        {/* Render the appointment modal */}
        {renderAppointmentModal()}
      </div>

      <div className="grid-container p-6">
        {renderGrid()}
      </div>

      {/*Details of selected appointment*/}
      {renderDetailsModal()}
    </>
  );
}

