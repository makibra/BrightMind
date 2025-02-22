"use client";
import Link from 'next/link';
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Admin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (email === 'abdelhak@gmail.com' && password === 'Azerty123@') {
            alert('Welcome Admin');
            router.push('/homeAdmin');
        } else {
            alert('Invalid email or password');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
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
            
            <div className='flex flex-col absolute z-0 w-full' style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                <Image className="mb-5" src="/logoBlanc.svg" alt="Logo" width={180} height={180} />
                <div className="bor h-auto w-auto p-10 flex flex-col justify-center items-center" style={{ textAlign: 'center', backgroundColor: '#F4F3F2', borderRadius: '4rem' }}>
                    <h1 className="text-5xl text-fc mb-7" style={{ fontFamily: 'Alex Brush' }}>Admin</h1>
                    <div>
                        <h2>Please enter the email address associated with your account:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                    className="rounded py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                    className="rounded py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-blue-500"
                                />
                            </div>
                            <div className="">
                                <button type="submit" className="w-[240px] bg-fc hover:bg-blue-600 text-white py-2 px-4 mb-2 mt-3 rounded-full focus:outline-none focus:shadow-outline">Log in</button>
                            </div>
                        </form>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
