import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface AppointmentFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

interface FormValues {
  name: string;
  gender: string;
  age: number;
  date: string;
  time: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md border border-gray-300"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          {...register('name', { required: 'Name is required' })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
          Gender:
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          {...register('gender', { required: 'Gender is required' })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
          Age:
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="number"
          {...register('age', { required: 'Age is required' })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date:
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="date"
          {...register('date', { required: 'Date is required' })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
          Time:
        </label>
        <input
          className="w-full p-2 border rounded-md"
          type="time"
          {...register('time', { required: 'Time is required' })}
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
