import React, { FC } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useQuery } from '@apollo/client';
import { GET_ALL_TODOS } from './../../apollo/ToDos';
import CachedIcon from '@mui/icons-material/Cached';

interface CardOfToDosProps {setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>}

const CardOfToDos: FC<CardOfToDosProps> = ({setSelectedDate}) => {
  // const {loading, error, data } = useQuery(GET_ALL_TODOS);

  // if (loading) {return <CachedIcon/>}
  // if (error) {return <h1>Error...</h1>}






  
  return (
    <div onClick={()=> setSelectedDate(null)} className='flex flex-col items-center bg-slate-300 w-3/4 h-1/2 shadow-xl'>
      <div className='mt-5 text-3xl'>Task on day</div>
      <div className='w-5/6 md:w-1/2 lg:w-5/6'>
        <div className='flex justify-between text-4xl my-5 p-5 border-2 rounded-md shadow-md'>
          <div className=''></div>
          <input
            placeholder='Write your task'
            type='text'
            className='outline-none border-b-[1px] text-xl w-full focus:border-b-[3px]'
          />
          <div className='cursor-pointer flex justify-center '>
            <button className='flex justify-center items-center'>
              <AddCircleOutlineIcon />
            </button>
          </div>
        </div>

        <ul className=''></ul>
      </div>
    </div>
  );
};

export default CardOfToDos;
