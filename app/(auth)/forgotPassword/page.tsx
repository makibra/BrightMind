"use client"
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function forgotPassword(){

   
   
    const[formData, setFormData] = useState({
        email: '',
       // username: '',
       // confirmationCode: ''
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = () => {
       
        if(formData.email === ''){
            alert('Please enter your email address');
            return;
        }


    //requette a la base de données de vérification de l'email s'il existe
        let existeUser = 0; 
          

        
        if(existeUser === 1){
            alert('A code has been sent to your email address');
            //envoie d'un mail de réinitialisation de mot de passe
        }
        else{
            alert('User does not exist. Please enter a valid email address');
        }

    }

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
        
        <div className='flex flex-col absolute z-0 w-full ' style={{ display: 'flex',
                  justifyContent: 'center', 
                  height:"100vh ",
                  alignItems: 'center',
                }}>

            <Image  className="mb-5" src="/logoBlanc.svg" alt="Logo" width={120} height={120} />     
            <div className="bor h-auto w-auto p-10 flex flex-col justify-center items-center" 
                    style={{ textAlign: 'center',
                            backgroundColor: '#F4F3F2' ,
                            borderRadius:'4rem',
                            }}>
                
                
                <h1 className="text-5xl  text-fc mb-7" style={{ fontFamily: 'Alex Brush'}}>Forgot Password</h1>
               
                <div>
                <h2 className=''>Please enter the email address associated with your account:</h2>
                <form onSubmit={handleSubmit}>
                    {/* <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                        type="text"
                        id="username"
                        name="username" 
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="rounded py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-blue-500 "
                        />
                    </div> */}


                    <div className="">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded py-2 px-3  mt-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        />
                    </div>
                  

                    <div className="">
                        <button type="submit" className="w-[240px] bg-fc hover:bg-blue-600 text-white py-2 px-4 mb-2 mt-3 rounded-full focus:outline-none focus:shadow-outline"  >Send</button>
                    </div>
                    
                </form>
                </div>


                <div>
                    <Link href="/">
                        <div className="text-green-700 hover:underline my-2">Return to login</div>
                    </Link>
                </div>
            </div>

        </div>
</div>
    )
}

