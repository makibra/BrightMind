import React from 'react';
import Link from 'next/link';

const  HeaderAdmin  = () => {
    return (
        <div className="sticky top-0 z-20" style={ {backgroundColor: 'var(--fc)', fontFamily: 'Poppins'}}>
        <header className="flex-col mx-auto  lg:w-[1350px]" style={ {backgroundColor: 'var(--fc)'}}>
            <div className=" text-white px-4 grid grid-cols-3 items-center m-0 p-0  ">

            </div>
                <div className=" text-white p-4 col-span-2 grid grid-cols-5  items-center ">
                    <div></div>
                    <div className='flex col-span-1 justify-center'><img src="/logoBlanc.svg" alt="Logo" width={60} height={60} /> </div>
                    <h1 className="border-b  col-span-2 py-6 text-4xl font-semibold ">Admin Dashboard</h1>
                    <div className="flex space-x-4 justify-start">
                      
                    </div>
                </div>
            </header>
             </div>
        );
};

export default HeaderAdmin;