import React, { FC, useState, useEffect, useRef } from "react";
import { ITodoItemProps, IToDo } from "../../Types";
import EditIcon from '@mui/icons-material/Edit';


const TodoItem: FC<ITodoItemProps> = ({ item, handleRemove, handleUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(item.text);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const currentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask(e.target.value);
    e.target.style.height = "16px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleTextChange = (id: number | string, text: string, checked: boolean, time?: string) => {
    setEdit(!edit);
    if (edit)
      handleUpdate(id, text, checked, time );
  };

  return (
    <li className='flex min-w-full justify-between items-center px-10 my-3 text-2xl border-2 rounded-md bg-orange-300 shadow-sm py-5'>
      <div className='flex items-center w-2/3'>
        <i
          onClick={() => handleUpdate( item.id,  item.text,  !item.checked,  item.time )}
          className={`-translate-y-1 cursor-pointer ${
            item.checked ? "check circle icon green" : "circle icon grey"
          }`}></i>
        <textarea
          ref={inputRef}
          disabled={!edit}
          value={task}
          onChange={(e) => currentText(e)}
          className={`overflow-hidden resize-none outline-none h-[25px] text-xl w-full mx-5 px-3 disabled:bg-transparent focus:border-b-[1px] ${
            item.checked && "line-through text-stone-500"
          }`}
          placeholder='Write some text'
        />
      </div>
      <div className='todo__edit'>
        <i
          onClick={() => handleTextChange(item.id,  task,  item.checked,  item.time)}
          className={edit ? "check icon cursor-pointer" : "pencil alternate icon cursor-pointer"} 
        />
        <i
          onClick={() => handleRemove( item.id  )}
          className='trash icon pl-5 cursor-pointer'></i>
      </div>
    </li>
  );
};

export default TodoItem;