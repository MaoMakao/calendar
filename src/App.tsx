import React from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import formatDate from './components/Date/formatDate';
import CardOfToDos from './components/ToDos/CardOfToDos';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return (
    <div className='flex justify-center items-center bg-green-300 flex-col m-auto h-screen '>
      {/* <div className='bg-violet-200 text-base text-black rounded-2xl mb-4 '>{formatDate(selectedDate, 'DDD DD MMM YYYY')}</div> */}
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {selectedDate && <CardOfToDos setSelectedDate={setSelectedDate} />}
    </div>
  );
};

export default App;
