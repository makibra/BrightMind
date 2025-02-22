"use client"
import  Sign  from '@/app/(auth)/SignUp/signe';
import Link from 'next/link';
import { useState } from 'react';
import FormS1 from '@/app/(auth)/SignUp/formS1'; // Fix the import statement
import FormT1 from '@/app/(auth)/SignUp/formT1';
import Image from 'next/image';

import {db} from "@/app/firebaseConfing";
import { collection, addDoc } from "firebase/firestore";

export default function SignUp() {

  const [currentForm, setCurrentForm] = useState(-1);
  const handleNext = () => {
    setCurrentForm(currentForm + 1);
  };
  const handlePrev = () => {
    setCurrentForm(currentForm - 1);
  };


  const totalForms = 3;
  const progressBarStyle = 'w-[430px] h-2 bg-gray-200 rounded overflow-hidden m-auto';
  const progressStyle = 'h-full bg-green-500';

  const renderProgressCirclesStudent = () => {
    const circles = [];
    for (let i = 0; i < totalForms; i++) {
      circles.push(
        <span
          key={i}
          className={`w-3 h-3 bg-gray-300 rounded-full ${
            i <= currentForm ? 'bg-green-500' : ''
          }`}
        ></span>
      );
    }
    return circles;
  };


  const renderProgressCirclesProf = () => {
    const circles = [];
    for (let i = 0; i < totalForms; i++) {
      circles.push(
        <span
          key={i}
          className={`w-3 h-3 bg-gray-300 rounded-full ${
            i+3 <= currentForm ? 'bg-green-500' : ''
          }`}
        ></span>
      );
    }
    return circles;
  };

return(
        
  <div className='main-area z-5'>
    <div className='circles'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    

    <div>
    <h1 className="text-center text-3xl font-bold mb-4 color-fc pt-12 pb-10 text-white text-5xl" style={{fontFamily: 'Poppins'}}>Start your journey here register now!</h1> 
    {currentForm > -1 && 
    <div className=" flex-col mx-auto  mt-5 mb-5 w-[500px] ">
      
          {currentForm > -1 && currentForm < 3 && 
              <div>
                <div className={progressBarStyle}>
                  <div
                    className={`${
                      currentForm === 0 ? 'w-0' : currentForm === 1 ? 'w-1/2' : 'w-full'
                    } ${progressStyle}`}
                  ></div>
                </div>
                <div className='bg-bleu-600'>
                  <div className="flex justify-between mt-2 mx-10">{renderProgressCirclesStudent()}</div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-white step min-w-[100px] text-center ">Personal informations</span>
                    <span className="text-sm text-white step min-w-[100px]  text-strat ">Confirmation</span>
                    <span className="text-sm text-white step min-w-[100px]  text-end pr-[10px]">get started</span>
                  </div>
                </div>
              </div>}
          {currentForm > 2 && currentForm < 6 && 
                <div>
                  <div className={progressBarStyle}>
                    <div
                      className={`${
                        currentForm === 3 ? 'w-0' : currentForm === 4 ? 'w-1/2' : 'w-full'
                      } ${progressStyle}`}
                    ></div>
                  </div>
                  <div>
                    <div className="flex justify-between mt-2 mx-10">{renderProgressCirclesProf()}</div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-white step">Personal informations</span>
                      <span className="text-sm text-white step">Diploma and Certification</span>
                      <span className="text-sm text-white step">Confirmation</span>
                    </div>
                  </div>
                </div>}
        </div>}


      <div className='flex flex-col absolute z-0 w-full ' style={{ display: 'flex',
                      justifyContent: 'center',                
                      alignItems: 'center',
                    }}>
        <div className="bor" 
            style={{ textAlign: 'center',
                    backgroundColor: '#F4F3F2' ,
                    borderRadius:'4rem',    
                    }}>
          {currentForm === -1 &&  <div>
                                    <h1 className='py-5 text-xl'>chose your profile student/teacher :</h1>
                                    <div className='flex flex-col-3  gaps-6 m-5'>
                                      <div onClick={() => setCurrentForm(0)}>
                                        <Image className='p-5 cursor-pointer' src="/avatarStudent.svg" alt="student" width={300} height={290} />
                                        <h3 className='p-3 text-xl cursor-pointer hover:underline'>student</h3>
                                      </div>
                                      <div className='w-10'></div>
                                      <div onClick={() => setCurrentForm(3)}>
                                        <Image className='p-5 cursor-pointer' src="/avatarProf.svg" alt="teacher" width={300} height={290} />
                                        <h3 className='p-3 text-xl cursor-pointer hover:underline'>teacher</h3>
                                      </div>
                                    </div>
                                  </div>}
          {currentForm < 3 && currentForm >= 0   && <FormS1 handleNext={handleNext} />}
          {currentForm >= 3 && currentForm < 6 && <FormT1 handleNext={handleNext}/>}

        </div>
      </div>
    </div>

  </div> 
)
}

