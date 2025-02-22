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
                    <div className='flex col-span-1 justify-center'><Link href={"/homeProf"}><img src="/logoBlanc.svg" alt="Logo" width={50} height={50} /> </Link></div>
                    <div></div>
                    <h1 className="col-span-3 flex space-x-4 justify-start text-3xl font-semibold ">Teacher Dashboard</h1>
                    <div className="flex space-x-4 justify-start">
                        
                        <img src="/notification.png" alt="notification" width={30} height={30} />
                    
                        <div className="h-30 w-30 ">
                            <DropdownMenu >
                                <DropdownMenuTrigger > <img className="m-auto" src="/dropdown.svg" alt="picUser" width={15} height={15} /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>User name</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={()=>{router.push('/profile');}}>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>{setGlobalVariable(''); router.push('/');}}>Disconect</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>
             </div>
        );
};

export default HeaderTeacher;