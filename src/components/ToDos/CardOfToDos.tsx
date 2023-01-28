import React, { useState, FC } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_DAY,
  GET_ALL_TODOS,
  GET_DAY_TODOS,
  UPDATE_TODOS,
  REMOVE_TODOS,
} from './../../apollo/ToDos';
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';
import { allTodosCache, IToDo } from '../../Types';
import TodoItem from './ToDoItem';
import { useEffect } from 'react';

interface CardOfToDosProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDate: Date | null;
}

const CardOfToDos: FC<CardOfToDosProps> = ({
  setSelectedDate,
  selectedDate,
}) => {
  const {
    data: allDays,
    error: globalError,
    
  } = useQuery(GET_ALL_TODOS);
  const [input, setInput] = useState('');
  const [currentDay, setCurrentDay] = useState<any>(null);
  let loading = false;

  const [createDay, { error: addError, called }] = useMutation(CREATE_DAY, {
    update(cache, { data: { createDay } }) {

      const allDays = cache.readQuery<any>({
        query: GET_ALL_TODOS,
      })?.allDays;
      cache.writeQuery({
        query: GET_ALL_TODOS,
        data: {
          allDays: [createDay, ...allDays],
        },
      });
    },
  });


  const [updateDay, { error: updateError }] = useMutation(UPDATE_TODOS);

  const [removeDay, { error: removeError }] = useMutation(REMOVE_TODOS, {
    update(cache, { data: { removeDay } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos: { __ref: string }[] = []) {
            return currentTodos.filter(
              todos => todos.__ref !== `Todos:${removeDay.id}`,
            );
          },
        },
      });
    },
  });

  const sort = (task: IToDo[]): IToDo[] | undefined => {
    if (task && task.length) {
      const newTask = [...task];
      return newTask.sort((a, b) => +a.checked - +b.checked);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateDay = async () => {
      loading = true;
     await createDay({
        variables: {
          todos: [],
          dayTime: selectedDate?.getTime().toString(),
        },
      });
      loading = false;
  };

  useEffect(() => {
      if (loading) return;
      if (selectedDate && allDays && allDays.allDays?.length) {
        const day = allDays?.allDays.find((day: any) => day.dayTime === selectedDate?.getTime().toString());
        if(day) {
          setCurrentDay(day);
          return;
        }
        handleCreateDay();
      }
  }, [allDays]);


  return (
    <div className='flex flex-col items-center bg-slate-300 w-3/4 h-1/2 shadow-xl'>
      <CloseIcon
        onClick={() => setSelectedDate(null)}
        className='flex justify-between'
      />
      <div className='mt-5 text-3xl'>Task on day</div>
      <div className='w-5/6 md:w-1/2 lg:w-5/6'>
        <div className='flex justify-between text-4xl my-5 p-5 border-2 rounded-md shadow-md'>
          <div className=''></div>
          <input
            placeholder='Write your task'
            type='text'
            className='outline-none border-b-[1px] text-xl w-full focus:border-b-[3px]'
            value={input}
            onChange={e => handleInputChange(e)}
          />
          <div className='cursor-pointer flex justify-center '>
            <button className='flex justify-center items-center'>
              <AddCircleOutlineIcon/>
            </button>
          </div>
        </div>

        <ul className=''>
          {currentDay &&
            sort(currentDay.allTodos as IToDo[])?.map(item => (
              <TodoItem
                key={item.id}
                item={item}
                handleRemove={removeDay}
                handleUpdate={updateDay}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CardOfToDos;
