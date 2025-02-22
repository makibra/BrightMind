"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { auth } from '../app/firebaseConfing';
import { useRouter } from 'next/navigation';
import { db } from '../app/firebaseConfing';
import { collection, getDocs } from 'firebase/firestore';
import { set } from 'firebase/database';



let globalVariable = 'Initial Value';
export const getGlobalVariable = () => globalVariable;
export const setGlobalVariable = (value) => {
  globalVariable = value;
};




export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (!res || !res.user) {
        alert('Invalid email or password');
        return;
      }
      setGlobalVariable(res.user.uid);
      const isTeacher = await uidTeacher(res.user.uid);

      if (isTeacher) {
        //alert('This is a teacher');
        router.push('/homeProf');
      } else {
        //alert('This is a student');
        router.push('/home');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const uidTeacher = async (id: string): Promise<boolean> => {
    const teacherRef = collection(db, 'user', 'all users', 'teachers');
    const querySnapshot = await getDocs(teacherRef);

    return querySnapshot.docs.some((doc) => doc.id === id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
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
    <div className='flex flex-col absolute z-0 w-full ' style={{ display: 'flex',
                  justifyContent: 'center', 
                  height:"100vh ",
                  alignItems: 'center',
                   fontFamily: 'Poppins'
                }}>
      <img src="/logoBlanc.svg" alt="BrightMinds Logo" className="inline-block align-middle mr-3 w-40 " />
      <h1 className="text-5xl  text-white mb-10" >Welcome to BrightMinds</h1>
      <div className="bor" 
          style={{ textAlign: 'center',
                   backgroundColor: '#F4F3F2' ,
                   borderRadius:'4rem',
                   }}>
          <div className='text-center text-white'>
          <p className="text-lg text-gray-600 mt-4 mb-0 pt-2 font-lights text-base tracking-wide font-semibold">
            Unlock Your Learning Journey, Dive into Knowledge, Inspire Growth!
          </p>
          </div>


          <div className='grid grid-cols-2 gap-2'>
              <div className='px-8 ' style={{width:'400px'}}>
                  <div className=''>
                      
                  </div>
                  <div className='p-10'>
                      <div >
                        <div className="p-2">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleChange(e)}
                            placeholder="Email"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="p-2">
                          <div className="relative">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={(e) => handleChange(e)}
                              placeholder="Password"
                              className="border pr-[30px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 cursor-pointer"
                            >
                              {passwordVisible ? (
                                <Image src="/open_eye.png" alt="Eye Open" width={20} height={20} />
                              ) : (
                                <Image src="/close_eye.png" alt="Eye Closed" width={20} height={20} />
                              )}
                            </button>
                          </div>
                          <div className='text-right'><p><Link href="/forgotPassword  "><button className="text-right text-sm underline text-gray-600">Forgot Password?</button></Link></p></div>
                        </div>
                        <button className='w-full bg-fc hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
                                onClick={handleLogin}>
                                Log in
                        </button>
                        <div className='flex flex-cols-3 ml-[14px]'>
                          <div className="w-[90px] mt-3" style={{ borderTop: '1px solid gray' }}></div>
                          <div className='text-gray-600 px-4'>or</div>
                          <div className="w-[90px] mt-3 " style={{ borderTop: '1px solid gray' }}></div>
                        </div>
                        <Link href="/homeGuest"><button  className='w-full mr-3 mb-2  bg-sc hover:bg-green-700 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Log in as Guest</button></Link>

                        <div className='flex flex-cols-2  '>
                          <p className=' text-sm p-[3px] pl-2 text-gray-600'>Don't have an account ?</p>
                          <a href="/SignUp" className='text-right text-green-700 underline ml-3'>Sign Up</a>
                        </div>
                      </div>
                  </div>
              </div>
              <div className='flex items-center  justify-start'>
                  <Image src="/login.png" alt="Your Image" width={350} height={290} className='floating-image ' />
              </div>
          </div>
      </div>
    </div>
    </div>
  );
}

        
    
        