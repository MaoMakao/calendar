import React from 'react';
import Calendar from './components/Calendar/Calendar';
import CardOfToDos from './components/ToDos/CardOfToDos';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  return (
    <div className=' flex justify-center items-center bg-orange-100  w-screen h-screen m-auto min-h-screen text-base '>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    
    {selectedDate && <CardOfToDos setSelectedDate={setSelectedDate} selectedDate={selectedDate} />}
    </div>
    
  );
};
export default App;
