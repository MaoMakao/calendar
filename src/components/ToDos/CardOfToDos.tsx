import React, { useState, FC } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_DAY,
  GET_ALL_TODOS,
  UPDATE_TODOS,
  REMOVE_TODOS,
} from './../../apollo/ToDos';
import CloseIcon from '@mui/icons-material/Close';
import { IToDo, CardOfToDosProps } from '../../Types';
import TodoItem from './ToDoItem';
import { useEffect } from 'react';
import formatDate from './../Date/formatDate';



const CardOfToDos: FC<CardOfToDosProps> = ({
  setSelectedDate,
  selectedDate,
}) => {
  const { data: allDays, error: globalError } = useQuery(GET_ALL_TODOS);

  const [input, setInput] = useState('');

  const [currentDay, setCurrentDay] = useState<any>(null);

  let loading = false;

  const [createDay, { error: addError }] = useMutation(CREATE_DAY, {
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

  const [updateDay, { error: updateError }] = useMutation(UPDATE_TODOS, {
    update(cache, { data: { updateDay } }) {
      const allDays = cache.readQuery<any>({
        query: GET_ALL_TODOS,
      })?.allDays;
      cache.writeQuery({
        query: GET_ALL_TODOS,
        data: {
          allDays: allDays.map((day: IToDo) => {
            if (day.id === updateDay.id) {
              return updateDay;
            } else {
              return day;
            }
          }),
        },
      });
    },
  });

  const [removeDay, { error: removeError }] = useMutation(REMOVE_TODOS, {
    update(cache, { data: { removeDay } }) {
      cache.modify({
        fields: {
          allDays(currentDay: { __ref: string }[] = []) {
            return currentDay.filter(
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
    if (selectedDate && allDays && allDays.allDays?.length && !loading) {
      const day = allDays?.allDays.find(
        (day: any) => day.dayTime === selectedDate?.getTime().toString(),
      );
      if (day) {
        setCurrentDay(day);
        return;
      }
      handleCreateDay();
    }
  }, [allDays]);

  const addToDo = () => {
    const updatedDay = {
      ...currentDay,
      todos: [
        ...currentDay.todos,
        { checked: false, text: input, id: Date.now(), time: '00:00' },
      ],
    };

    setInput('');

    updateDay({
      variables: {
        todos: updatedDay.todos,
        id: updatedDay.id,
        dayTime: updatedDay.dayTime,
      },
    });
    setCurrentDay(updatedDay);
  };

  const deleteToDo = (id: number | string) => {
    const deletedToDos = {
      ...currentDay,
      todos: currentDay.todos.filter((todos: { id: any }) => todos.id !== id),
    };

    updateDay({
      variables: {
        todos: deletedToDos.todos,
        id: deletedToDos.id,
        dayTime: deletedToDos.dayTime,
      },
    });

    setCurrentDay(deletedToDos);
  };

  const updateToDo = (
    id: number | string,
    text: string,
    checked: boolean,
    time?: string,
  ) => {
    const deletedToDos = {
      ...currentDay,
      todos: currentDay.todos.map((todo: any) => {
        if (todo.id === id) {
          return { ...todo, text: text, checked: checked };
        }
        return todo;
      }),
    };

    updateDay({
      variables: {
        todos: deletedToDos.todos,
        id: deletedToDos.id,
        dayTime: deletedToDos.dayTime,
      },
    });

    setCurrentDay(deletedToDos);
  };

  return (
    <div className='absolute flex flex-col items-center bg-green-100 min-w-fit min-h-[82%] w-3/4 rounded-2xl shadow-xl'>
      <CloseIcon
        onClick={() => setSelectedDate(null)}
        className='flex justify-center'
      />
      <div className='bg-violet-200 text-base text-black rounded-2xl mb-4 '>
        {formatDate(selectedDate, 'DDD DD MMM YYYY')}
      </div>

      <div className='mt-5 text-3xl'>Task on day</div>
      <div className='w-5/6 md:w-1/2 lg:w-5/6 min-w-fit min-h-fit'>
        <div className='flex justify-between text-4xl my-5 p-5 border-2 rounded-md shadow-md bg-slate-50'>
          
          <input
            placeholder='Write your task'
            type='text'
            className='outline-none text-xl w-full  bg-slate-50 '
            value={input}
            onChange={e => handleInputChange(e)}
          />
          <div className='cursor-pointer flex justify-center '>
            <button
              onClick={addToDo}
              className='flex justify-center items-center'>
              <AddCircleOutlineIcon />
            </button>
          </div>
        </div>

        <ul className=''>
          {currentDay &&
            sort(currentDay.todos as IToDo[])?.map(item => (
              <TodoItem
                key={item.id}
                item={item}
                handleRemove={deleteToDo}
                handleUpdate={updateToDo}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CardOfToDos;
