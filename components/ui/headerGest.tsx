import React from 'react';
import Image from 'next/image';
import { setGlobalVariable ,getGlobalVariable} from '@/app/page';
import { useRouter } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link';



const  HeaderTeacher  = () => {
    const router = useRouter();
    return (
        <div className="sticky top-0 z-20" style={ {backgroundColor: 'var(--fc)', fontFamily: 'Poppins'}}>
        <header className="flex-col mx-auto  lg:w-[1350px]" style={ {backgroundColor: 'var(--fc)'}}>
            <div className=" text-white px-4 grid grid-cols-3 items-center m-0 p-0  ">

            </div>
                <div className=" text-white p-4 col-span-2 grid grid-cols-6  items-center ">
                    <div className='flex col-span-1 justify-center'><Link href={"/homeGuest"}><img src="/logoBlanc.svg" alt="Logo" width={50} height={50} /> </Link></div>
                    <div></div>
                    <h1 className="col-span-3 flex space-x-4 justify-start text-3xl font-semibold ">Welcome to BrightMinds</h1>
                    <div className="flex space-x-4 justify-start">
                        
                    
                        <Link href={"/SignUp"}><h2>Sign Up</h2> </Link>
                    </div>
                </div>
            </header>
             </div>
        );
};

export default HeaderTeacher;