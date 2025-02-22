"use client"
import React,{useEffect} from 'react';
import Image from 'next/image';
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
import Router from 'next/router';
import { setGlobalVariable ,getGlobalVariable} from '@/app/page';
import {auth, db , storage} from '@/app/firebaseConfing';
import { getStorage, ref,uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc ,updateDoc,deleteDoc, where,setDoc, getDocs, getDoc } from 'firebase/firestore';

const  Header  = () => {
    const [userName, setUserName] = React.useState('');
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const iduser = getGlobalVariable();
                const studentDocRef = doc(db, 'user/all users/students', iduser);
                const teacherDocRef = doc(db, 'user/all users/teachers', iduser);
                const docSnapshot = await getDoc(studentDocRef);
                const docSnapshot2 = await getDoc(teacherDocRef);
                if (docSnapshot.exists()) {
                    setUserName(docSnapshot.data().username);
                    //setUserName(docSnapshot.data().imageUrl);
                    
                //     const imageRef = ref(storage, docSnapshot.data().imageUrl);
                // const url = await getDownloadURL(imageRef);
                // setImage(url);
                    
                } else if (docSnapshot2.exists()){
                    setUserName(docSnapshot2.data().username);
                //     console.log("teacher", docSnapshot2.data());
                //     setImageUrl(docSnapshot2.data().imageUrl);
    
                //     const imageRef = ref(storage, docSnapshot2.data().imageUrl);
                // const url = await getDownloadURL(imageRef);
                // setImage(url);
                    
                }
                
                
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };
    
        fetchUserInfo();
    },[]);

    const router=useRouter();

        return (
                <div className="sticky top-0 z-20" style={ {backgroundColor: 'var(--fc)'}}>
        <header className="flex-col mx-auto  lg:w-[1350px]" style={ {backgroundColor: 'var(--fc)'}}>
            <div className=" text-white px-4 grid grid-cols-3 items-center m-0 p-0  ">

            </div>
                {/* Logo */}
                <div className=" text-white p-4 col-span-2 grid grid-cols-6  items-center ">
                    <div className='flex'><Link href={"/home"}><img src="/logoBlanc.svg" alt="Logo" width={50} height={50} /> </Link></div>    
                    <input
                        type="text"
                        placeholder="Search"





                        //when he search he will be oriented to search page
                        //link to search page
                        //button search ??????????






                        
                        className=" px-2 py-1 rounded-full focus:outline-blue-600 text-black col-span-3"
                    />
                    <div></div>
                    
                {/* Icons for Cart, Favorites, Notifications, Settings */}
                <div className="flex space-x-4 justify-end">
                    <Link href='/home/cart'><img src="/cart.png" alt="cart" width={30} height={30} /></Link>
                    <Link href='/home/favorite'><img src="/heart.png" alt="favorit" width={30} height={30} /></Link>
                    <img src="/notification.png" alt="notification" width={30} height={30} />
                 
                    <div className="h-30 w-30">
                        <DropdownMenu >
                            <DropdownMenuTrigger > <img className="m-auto" src="/dropdown.svg" alt="picUser" width={15} height={15} /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
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

export default Header;