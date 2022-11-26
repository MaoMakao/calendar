import React from 'react'
import arrowLeft from './../images/arrowLeft.svg'; 

const ArrowSwitcher = () => {
  
  return (
    <div className='w-52 rounded-md capitalize bg-white'>
        <div className='relative rounded-md bg-white text-black  p-2 flex justify-between items-center shadow-md'>
          <img
            alt='AA'
            src={arrowLeft}
            aria-hidden
            className='w-2 h-4 cursor-pointer bg-gradient-to-t '
            onClick={() => functions.onClickArrow('left')} // Тут из объекта достаешь переключалку для конкретного режима и даешь ей допустим -1
          />
          {mode === 'days' && (
            <div aria-hidden>
              {state.monthNames[state.selectedMonth.monthIndex].month}{' '}
              {selectedMonth.year}
            </div>
          )}
          {mode === 'monthes' && (
            <div aria-hidden onClick={() => functions.setMode('years')}>
              {state.selectedYear}
            </div>
          )}
          {mode === 'years' && (
            <div>
              {state.selectedYearInterval[0]} -{' '}
              {
                state.selectedYearInterval[
                  state.selectedYearInterval.length - 1
                ]
              }
            </div>
          )}
          <img
            alt='AA'
            src={arrowLeft}
            aria-hidden
            className='w-2 h-4 cursor-pointer bg-gradient-to-t transform'
            onClick={() => functions.onClickArrow('right')}
          />
        </div>
        </div>
  )
}

export default ArrowSwitcher

