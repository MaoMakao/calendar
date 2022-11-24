import React, { FC } from 'react';
import { Modes } from '../../../Types';

interface ModeSwitcherProps {
  setMode: React.Dispatch<React.SetStateAction<Modes>>;
}

const modes = ['days', 'monthes', 'years'];

const ModeSwitcher: FC<ModeSwitcherProps> = ({ setMode }) => {
  return (
    <div className='flex'>
      {modes.map(item => (
        <div onClick={() => setMode(item as Modes)} key={item}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default ModeSwitcher;
