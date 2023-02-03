import React, { FC } from 'react';
import { Modes } from '../../../Types';

interface ModeSwitcherProps {
  setMode: React.Dispatch<React.SetStateAction<Modes>>;
}

const modes = ['days', 'monthes', 'years'];

const ModeSwitcher: FC<ModeSwitcherProps> = ({ setMode }) => {
  return (
    <div className={'flex  text-center cursor-pointer'}>
      {modes.map(item => (
        <div className={'flex cursor-pointer py-1 px-3 rounded-full text-white  bg-gray-500'} onClick={() => setMode(item as Modes)} key={item}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default ModeSwitcher;
