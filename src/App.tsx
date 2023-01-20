import React from "react";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import formatDate from "./components/Date/formatDate";
import CardOfToDos from './components/ToDos/CardOfToDos';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // Обычно FC, useState и другие хуки импортируют сверху рядом с реактом, никто не пишет постоянно React.ЧтоТо

  return (
    <div className='flex justify-center items-center bg-green-300 flex-col m-auto h-screen '>
      <div className='bg-violet-200 text-base text-black rounded-2xl mb-4 '>{formatDate(selectedDate, 'DDD DD MMM YYYY')}</div>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <CardOfToDos/>
    </div>
  );
};

export default App;