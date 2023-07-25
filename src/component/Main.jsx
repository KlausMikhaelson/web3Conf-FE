import React from 'react'

import communication from '../images/communication.png'
import support from '../images/support.png'
import board from '../images/blackboard.png'
import meet from '../images/board-meeting.png'
const Main = () => {
  return (
    <div className='back flex flex-col items-center h-screen justify-center'>
    <h1 className="main flex font-bold text-[3rem] z-[999]">Collabrate Like Never before with your team</h1>
    
    <button type="button" class="text-gray-900 bg-gradient-to-r mt-5 from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-12 py-[1rem] text-[1.5rem] text-center mr-2 mb-2">Start Now</button>


    <div className='absolute'>
    <img src={communication} class="h-[5rem] w-[5rem] mr-3 absolute top-[-10rem] left-[-17rem] " alt="Flowbite Logo" />
    <img src={support} class="h-[5rem] w-[5rem] absolute top-[-8rem] left-[15rem]" alt="Flowbite Logo" />
    <img src={board} class="h-[5rem] w-[5rem] absolute bottom-[-10rem] left-[10rem]" alt="Flowbite Logo ]" />
    <img src={meet} class="h-[5rem] w-[5rem] relative left-[-12rem] " alt="Flowbite Logo" />
    <img src={board} class="h-[5rem] w-[5rem] relative right-[36rem] top-[15rem]" alt="Flowbite Logo ]" />
    </div>
 </div> )
}

export default Main