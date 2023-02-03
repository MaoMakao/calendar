import React from 'react';
import Calendar from './components/Calendar/Calendar';
import CardOfToDos from './components/ToDos/CardOfToDos';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  return (
    <div className='flex justify-center items-center bg-green-300 flex-col h-3/4 w-3/4 m-auto min-h-screen text-base '>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    
    <div className='flex justify-center absolute'>{selectedDate && <CardOfToDos setSelectedDate={setSelectedDate} selectedDate={selectedDate} />}</div>
    </div>
    
  );
};
export default App;
